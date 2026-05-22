import { CheckCircle2 } from 'lucide-react'

import { Button } from '@/core/ui/button'

import type { HatchProfile } from '../util/hatchlink-types'

export function HatchlinkUiProfilePicker({
  profiles,
  selectedProfile,
  selectProfile,
}: {
  profiles: HatchProfile[]
  selectedProfile: HatchProfile
  selectProfile(profile: HatchProfile): void
}) {
  return (
    <section className="grid gap-3 sm:grid-cols-3">
      {profiles.map((profile) => {
        const selected = profile.id === selectedProfile.id

        return (
          <Button
            className="h-auto justify-start p-4 text-left"
            key={profile.id}
            onClick={() => selectProfile(profile)}
            variant={selected ? 'default' : 'outline'}
          >
            <span className="flex w-full items-start gap-3">
              <span className="mt-1 size-3 rounded-full" style={{ backgroundColor: profile.accent }} />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold">{profile.name}</span>
                <span className="block text-xs opacity-75">
                  {profile.rarity} / {profile.supply} supply
                </span>
              </span>
              {selected ? <CheckCircle2 className="size-4 shrink-0" /> : null}
            </span>
          </Button>
        )
      })}
    </section>
  )
}
