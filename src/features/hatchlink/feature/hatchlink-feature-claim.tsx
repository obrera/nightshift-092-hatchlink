import { useWalletUi } from '@wallet-ui/react'
import { toast } from 'sonner'

import { useSolanaClient } from '@/solana/data-access/use-solana-client'

import type { HatchProfile } from '../util/hatchlink-types'

import { useHatchlinkClaim } from '../data-access/use-hatchlink-claim'
import { HatchlinkUiClaimPanel } from '../ui/hatchlink-ui-claim-panel'

export function HatchlinkFeatureClaim({ profile }: { profile: HatchProfile }) {
  const client = useSolanaClient()
  const { account, connected } = useWalletUi()

  if (!account) {
    return (
      <HatchlinkUiClaimPanel
        claimCompanion={() => toast.error('Connect a wallet before claiming.')}
        connected={connected}
        isClaiming={false}
        profile={profile}
      />
    )
  }

  return <HatchlinkFeatureConnectedClaim account={account} client={client} connected={connected} profile={profile} />
}

function HatchlinkFeatureConnectedClaim({
  account,
  client,
  connected,
  profile,
}: {
  account: NonNullable<ReturnType<typeof useWalletUi>['account']>
  client: ReturnType<typeof useSolanaClient>
  connected: boolean
  profile: HatchProfile
}) {
  const claim = useHatchlinkClaim({ account, client })

  function claimCompanion() {
    claim.mutate(profile, {
      onError: (error) => toast.error(error instanceof Error ? error.message : String(error)),
      onSuccess: (result) => toast.success(`Companion asset created: ${result.assetAddress}`),
    })
  }

  return (
    <HatchlinkUiClaimPanel
      claimCompanion={claimCompanion}
      claimResult={claim.data}
      connected={connected}
      isClaiming={claim.isPending}
      profile={profile}
    />
  )
}
