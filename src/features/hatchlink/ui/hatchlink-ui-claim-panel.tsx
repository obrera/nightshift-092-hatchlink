import { ExternalLink, Sparkles } from 'lucide-react'

import { Button } from '@/core/ui/button'
import { Spinner } from '@/core/ui/spinner'
import { SolanaUiWalletDropdown } from '@/solana/ui/solana-ui-wallet-dropdown'

import type { HatchClaimResult, HatchProfile } from '../util/hatchlink-types'

export function HatchlinkUiClaimPanel({
  claimCompanion,
  claimResult,
  connected,
  isClaiming,
  profile,
}: {
  claimCompanion(): void
  claimResult?: HatchClaimResult
  connected: boolean
  isClaiming: boolean
  profile: HatchProfile
}) {
  return (
    <section className="rounded-lg border border-white/10 bg-zinc-950/80 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-400">Connected wallet claim</p>
          <h2 className="text-lg font-semibold">Hatch {profile.species}</h2>
        </div>
        <SolanaUiWalletDropdown className="w-full sm:w-64" />
      </div>
      <Button className="mt-4 w-full" disabled={!connected || isClaiming} onClick={claimCompanion}>
        {isClaiming ? <Spinner /> : <Sparkles />}
        Sign MPL Core Claim
      </Button>
      {claimResult ? (
        <div className="mt-4 space-y-2 rounded-md border border-emerald-400/30 bg-emerald-400/10 p-3 text-sm">
          <p className="font-semibold text-emerald-200">Claim receipt captured</p>
          <p className="break-all text-zinc-300">Asset: {claimResult.assetAddress}</p>
          <p className="break-all text-zinc-300">Tx: {claimResult.signature}</p>
          <a
            className="inline-flex items-center gap-2 text-emerald-200 underline-offset-4 hover:underline"
            href={`https://explorer.solana.com/address/${claimResult.assetAddress}?cluster=devnet`}
            rel="noreferrer"
            target="_blank"
          >
            View asset <ExternalLink className="size-3" />
          </a>
        </div>
      ) : null}
    </section>
  )
}
