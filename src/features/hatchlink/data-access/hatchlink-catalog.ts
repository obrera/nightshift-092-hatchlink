import type { HatchProfile } from '../util/hatchlink-types'

export const HATCH_PROFILES: HatchProfile[] = [
  {
    accent: '#68e1a8',
    aura: 'Biolume',
    backdrop: '#101f23',
    cooldownHours: 6,
    id: 'reef-runner',
    line: 'Tidecall',
    name: 'Reef Runner Egg',
    rarity: 'Rare',
    seed: 'HATCH-092-REEF-731',
    species: 'Axo Sprite',
    supply: 320,
    temperament: 'Curious',
  },
  {
    accent: '#f2c36b',
    aura: 'Solar Shell',
    backdrop: '#241b12',
    cooldownHours: 12,
    id: 'sunbreak-whelp',
    line: 'Daybreak',
    name: 'Sunbreak Whelp Egg',
    rarity: 'Epic',
    seed: 'HATCH-092-SUN-144',
    species: 'Kirin Cub',
    supply: 90,
    temperament: 'Bold',
  },
  {
    accent: '#8ad8ff',
    aura: 'Frost Signal',
    backdrop: '#111827',
    cooldownHours: 4,
    id: 'drift-pip',
    line: 'Northline',
    name: 'Drift Pip Egg',
    rarity: 'Common',
    seed: 'HATCH-092-DRIFT-508',
    species: 'Mothling',
    supply: 700,
    temperament: 'Steady',
  },
]

export function findHatchProfile(profileId: string) {
  const profile = HATCH_PROFILES.find((candidate) => candidate.id === profileId)

  if (!profile) {
    throw new Error(`Unknown hatch profile: ${profileId}`)
  }

  return profile
}
