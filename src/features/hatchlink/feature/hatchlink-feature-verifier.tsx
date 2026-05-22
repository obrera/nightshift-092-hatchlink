import { toast } from 'sonner'

import { useSolanaClient } from '@/solana/data-access/use-solana-client'

import { useHatchlinkProof } from '../data-access/use-hatchlink-proof'
import { HatchlinkUiVerifier } from '../ui/hatchlink-ui-verifier'

export function HatchlinkFeatureVerifier() {
  const client = useSolanaClient()
  const proof = useHatchlinkProof(client)

  function verify(query: string) {
    proof.mutate(query, {
      onError: (error) => toast.error(error instanceof Error ? error.message : String(error)),
      onSuccess: () => toast.success('Asset proof resolved from devnet.'),
    })
  }

  return <HatchlinkUiVerifier isVerifying={proof.isPending} proof={proof.data} verify={verify} />
}
