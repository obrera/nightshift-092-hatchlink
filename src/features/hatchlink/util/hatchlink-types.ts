import type { Address } from '@solana/kit'

export interface HatchAttribute {
  trait_type: string
  value: string
}

export interface HatchClaimResult {
  assetAddress: Address
  metadataUri: string
  signature: string
}

export interface HatchMetadata {
  attributes: HatchAttribute[]
  description: string
  image: string
  name: string
  properties: {
    category: string
    files: Array<{ type: string; uri: string }>
  }
}

export interface HatchProfile {
  accent: string
  aura: string
  backdrop: string
  cooldownHours: number
  id: string
  line: string
  name: string
  rarity: 'Common' | 'Epic' | 'Mythic' | 'Rare'
  seed: string
  species: string
  supply: number
  temperament: string
}

export interface HatchProof {
  assetAddress: string
  dataBytes: number
  metadata?: HatchMetadata
  name: string
  owner: string
  source: 'asset' | 'signature'
  updateAuthority: string
  uri: string
}
