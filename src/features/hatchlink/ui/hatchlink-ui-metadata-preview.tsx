import { Badge } from '@/core/ui/badge'

import type { HatchProfile } from '../util/hatchlink-types'

import { createCompanionArtUri, createHatchMetadata } from '../util/hatchlink-metadata'

export function HatchlinkUiMetadataPreview({ owner, profile }: { owner: string; profile: HatchProfile }) {
  const metadata = createHatchMetadata({ artUri: createCompanionArtUri(profile, owner), owner, profile })

  return (
    <div className="space-y-4 rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div>
        <p className="text-sm text-zinc-400">Metadata preview</p>
        <h2 className="text-xl font-semibold">{metadata.name}</h2>
      </div>
      <p className="text-sm leading-6 text-zinc-300">{metadata.description}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {metadata.attributes.map((attribute) => (
          <div className="rounded-md border border-white/10 bg-black/20 p-3" key={attribute.trait_type}>
            <p className="text-xs text-zinc-500">{attribute.trait_type}</p>
            <p className="truncate text-sm font-medium">{attribute.value}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">MPL Core devnet</Badge>
        <Badge variant="secondary">Transferable asset</Badge>
        <Badge variant="secondary">Wallet-owned</Badge>
      </div>
    </div>
  )
}
