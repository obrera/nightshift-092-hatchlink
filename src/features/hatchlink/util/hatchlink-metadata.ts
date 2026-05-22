import type { HatchMetadata, HatchProfile } from './hatchlink-types'

export function createCompanionArtSvg(profile: HatchProfile, owner: string) {
  const mark = checksum(`${owner}:${profile.seed}`)
  const left = 118 + (mark % 24)
  const right = 258 - (mark % 20)
  const eye = profile.rarity === 'Mythic' || profile.rarity === 'Epic' ? '#fff7ad' : '#eff6ff'

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 420" role="img"><rect width="420" height="420" fill="${profile.backdrop}"/><circle cx="210" cy="210" r="164" fill="${profile.accent}" opacity=".12"/><circle cx="118" cy="116" r="32" fill="${profile.accent}" opacity=".35"/><circle cx="310" cy="88" r="18" fill="#ffffff" opacity=".16"/><path d="M96 252c0-88 52-154 116-154s112 66 112 154c0 72-48 110-114 110S96 324 96 252Z" fill="#f8fafc"/><path d="M122 252c0-71 37-126 89-126s88 55 88 126c0 57-36 86-89 86s-88-29-88-86Z" fill="${profile.accent}" opacity=".22"/><path d="M${left} 196c32-39 70-39 101 0" fill="none" stroke="${profile.accent}" stroke-width="16" stroke-linecap="round"/><circle cx="166" cy="228" r="14" fill="${eye}"/><circle cx="252" cy="228" r="14" fill="${eye}"/><path d="M178 285c22 18 48 18 70 0" fill="none" stroke="#0f172a" stroke-width="10" stroke-linecap="round"/><path d="M86 318c46 34 91 52 135 52s82-18 119-52" fill="none" stroke="${profile.accent}" stroke-width="18" stroke-linecap="round" opacity=".5"/><text x="210" y="390" text-anchor="middle" fill="#f8fafc" font-family="Arial" font-size="18">${profile.species} ${right}</text></svg>`
}

export function createCompanionArtUri(profile: HatchProfile, owner: string) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(createCompanionArtSvg(profile, owner))}`
}

export function createHatchMetadata({
  artUri,
  owner,
  profile,
}: {
  artUri: string
  owner: string
  profile: HatchProfile
}) {
  return {
    attributes: [
      { trait_type: 'Build', value: 'Nightshift 092' },
      { trait_type: 'Drop Seed', value: profile.seed },
      { trait_type: 'Species', value: profile.species },
      { trait_type: 'Rarity', value: profile.rarity },
      { trait_type: 'Line', value: profile.line },
      { trait_type: 'Aura', value: profile.aura },
      { trait_type: 'Temperament', value: profile.temperament },
      { trait_type: 'Claim Owner', value: owner },
    ],
    description: `HatchLink transferable companion collectible from ${profile.name}. Ownership carries identity, rarity traits, transferability, and provenance for the hatched companion.`,
    image: artUri,
    name: `HatchLink ${profile.species} - ${profile.rarity}`,
    properties: {
      category: 'image',
      files: [{ type: 'image/svg+xml', uri: artUri }],
    },
  } satisfies HatchMetadata
}

export function createHatchRunId(owner: string, profile: HatchProfile) {
  return `${profile.id}-${checksum(`${owner}:${profile.seed}`).toString(36).padStart(3, '0')}`
}

export function createMetadataUri({
  origin,
  owner,
  profile,
}: {
  origin: string
  owner: string
  profile: HatchProfile
}) {
  const runId = createHatchRunId(owner, profile)
  const query = new URLSearchParams({ owner, profile: profile.id, seed: profile.seed })

  return `${origin}/metadata/${encodeURIComponent(runId)}.json?${query.toString()}`
}

function checksum(input: string) {
  return [...new TextEncoder().encode(input)].reduce((sum, byte, index) => (sum + byte * (index + 17)) % 9973, 0)
}
