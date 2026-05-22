import { useMutation } from '@tanstack/react-query'
import { type UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'

import type { SolanaClient } from '@/solana/data-access/solana-client'

import { type HatchProfile } from '../util/hatchlink-types'
import { claimHatchCompanion } from './hatchlink-mint'

export function useHatchlinkClaim({ account, client }: { account: UiWalletAccount; client: SolanaClient }) {
  const transactionSigner = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: (profile: HatchProfile) =>
      claimHatchCompanion({
        client,
        origin: window.location.origin,
        profile,
        transactionSigner,
      }),
  })
}
