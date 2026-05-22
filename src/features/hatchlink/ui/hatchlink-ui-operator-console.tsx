import { SlidersHorizontal } from 'lucide-react'

import { Slider } from '@/core/ui/slider'
import { Switch } from '@/core/ui/switch'

import type { HatchProfile } from '../util/hatchlink-types'

export function HatchlinkUiOperatorConsole({
  readiness,
  selectedProfile,
  setReadiness,
}: {
  readiness: number
  selectedProfile: HatchProfile
  setReadiness(value: number): void
}) {
  const live = readiness >= 70 && selectedProfile.supply > 0

  return (
    <section className="rounded-lg border border-white/10 bg-zinc-950/70 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-zinc-400">Operator drop console</p>
          <h2 className="text-lg font-semibold">Readiness gate</h2>
        </div>
        <SlidersHorizontal className="size-5 text-emerald-300" />
      </div>
      <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
        <Slider
          max={100}
          min={0}
          onValueChange={(value) => setReadiness(Array.isArray(value) ? (value[0] ?? readiness) : value)}
          value={[readiness]}
        />
        <div className="rounded-md border border-white/10 bg-white/[0.04] p-3 text-center">
          <p className="text-2xl font-semibold">{readiness}%</p>
          <p className="text-xs text-zinc-400">ready</p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-md bg-black/20 p-3">
          <p className="text-zinc-500">Remaining supply</p>
          <p className="font-semibold">{selectedProfile.supply}</p>
        </div>
        <div className="rounded-md bg-black/20 p-3">
          <p className="text-zinc-500">Rarity lane</p>
          <p className="font-semibold">{selectedProfile.rarity}</p>
        </div>
        <div className="flex items-center justify-between rounded-md bg-black/20 p-3">
          <span>{live ? 'Drop live' : 'Staged'}</span>
          <Switch checked={live} readOnly />
        </div>
      </div>
    </section>
  )
}
