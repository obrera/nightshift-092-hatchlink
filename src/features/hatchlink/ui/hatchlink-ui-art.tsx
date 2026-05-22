import type { HatchProfile } from '../util/hatchlink-types'

import { createCompanionArtUri } from '../util/hatchlink-metadata'

export function HatchlinkUiArt({ owner, profile }: { owner: string; profile: HatchProfile }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-black/30">
      <img
        alt={`${profile.species} companion preview`}
        className="aspect-square w-full object-cover"
        src={createCompanionArtUri(profile, owner)}
      />
    </div>
  )
}
