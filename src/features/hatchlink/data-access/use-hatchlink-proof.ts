import { useMutation } from '@tanstack/react-query'

import type { SolanaClient } from '@/solana/data-access/solana-client'

import { resolveHatchlinkAssetProof } from './hatchlink-asset-proof'

export function useHatchlinkProof(client: SolanaClient) {
  return useMutation({
    mutationFn: (query: string) => resolveHatchlinkAssetProof(client, query.trim()),
  })
}
