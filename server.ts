import { findHatchProfile } from './src/features/hatchlink/data-access/hatchlink-catalog'
import { createCompanionArtSvg, createHatchMetadata } from './src/features/hatchlink/util/hatchlink-metadata'

const port = Number(process.env.PORT ?? 3000)
const distRoot = new URL('./dist/', import.meta.url)

function json(data: unknown, init?: ResponseInit) {
  return Response.json(data, {
    headers: { 'cache-control': 'no-store', ...init?.headers },
    status: init?.status,
  })
}

function parseMetadataRequest(url: URL) {
  const owner = url.searchParams.get('owner')
  const profileId = url.searchParams.get('profile')

  if (!owner || !profileId) {
    return null
  }

  return { owner, profile: findHatchProfile(profileId) }
}

function publicOrigin(request: Request) {
  const url = new URL(request.url)
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? url.host
  const protocol = request.headers.get('x-forwarded-proto') ?? url.protocol.replace(/:$/, '')

  return `${protocol}://${host}`
}

async function serveStatic(pathname: string) {
  if (pathname.includes('..')) {
    return new Response('Bad request', { status: 400 })
  }

  const filePath = pathname === '/' ? 'index.html' : pathname.slice(1)
  const file = Bun.file(new URL(filePath, distRoot))

  if (await file.exists()) {
    return new Response(file)
  }

  return new Response(Bun.file(new URL('index.html', distRoot)))
}

Bun.serve({
  async fetch(request) {
    const url = new URL(request.url)

    if (url.pathname === '/health' || url.pathname === '/api/health') {
      return json({ ok: true, project: 'HatchLink 092' })
    }

    const metadataMatch = url.pathname.match(/^\/metadata\/(.+)\.json$/)
    if (metadataMatch?.[1]) {
      const params = parseMetadataRequest(url)
      if (!params) {
        return json({ error: 'invalid_metadata_request' }, { status: 400 })
      }

      const query = url.searchParams.toString()
      const artUri = `${publicOrigin(request)}/metadata/${encodeURIComponent(metadataMatch[1])}.svg?${query}`

      return json(createHatchMetadata({ ...params, artUri }))
    }

    const imageMatch = url.pathname.match(/^\/metadata\/(.+)\.svg$/)
    if (imageMatch?.[1]) {
      const params = parseMetadataRequest(url)
      if (!params) {
        return new Response('Invalid metadata request', { status: 400 })
      }

      return new Response(createCompanionArtSvg(params.profile, params.owner), {
        headers: { 'cache-control': 'public, max-age=300', 'content-type': 'image/svg+xml; charset=utf-8' },
      })
    }

    return serveStatic(url.pathname)
  },
  port,
})

console.log(`HatchLink 092 server listening on ${port}`)
