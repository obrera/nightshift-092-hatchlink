import { useWalletUi } from '@wallet-ui/react'
import { useState } from 'react'

import { HATCH_PROFILES } from '../data-access/hatchlink-catalog'
import { HatchlinkUiArt } from '../ui/hatchlink-ui-art'
import { HatchlinkUiMetadataPreview } from '../ui/hatchlink-ui-metadata-preview'
import { HatchlinkUiOperatorConsole } from '../ui/hatchlink-ui-operator-console'
import { HatchlinkUiProfilePicker } from '../ui/hatchlink-ui-profile-picker'
import { HatchlinkFeatureClaim } from './hatchlink-feature-claim'
import { HatchlinkFeatureVerifier } from './hatchlink-feature-verifier'

export function Component() {
  const { account } = useWalletUi()
  const [readiness, setReadiness] = useState(84)
  const [selectedProfile, setSelectedProfile] = useState(HATCH_PROFILES[0]!)
  const owner = String(account?.address ?? 'wallet-preview-owner')

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(104,225,168,0.18),_transparent_32rem),linear-gradient(180deg,_#09090b,_#111827_45%,_#09090b)] px-4 py-6 text-zinc-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="text-sm font-medium tracking-[0.24em] text-emerald-300 uppercase">
              Nightshift 092 / HatchLink
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl">
              Claim and hatch a transferable companion egg
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
              Build a drop seed, preview the generated companion metadata, sign the MPL Core devnet asset creation with
              the connected wallet, then verify the on-chain owner and provenance.
            </p>
          </div>
          <div className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-50">
            <p className="font-semibold">Wallet-signed only</p>
            <p className="mt-2 text-emerald-100/80">
              The UI creates the companion as an MPL Core asset owned and updated by the connected wallet. No server
              mint path is present.
            </p>
          </div>
        </header>

        <HatchlinkUiProfilePicker
          profiles={HATCH_PROFILES}
          selectedProfile={selectedProfile}
          selectProfile={setSelectedProfile}
        />

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="space-y-6">
            <HatchlinkUiArt owner={owner} profile={selectedProfile} />
            <HatchlinkFeatureClaim profile={selectedProfile} />
          </div>
          <div className="space-y-6">
            <HatchlinkUiMetadataPreview owner={owner} profile={selectedProfile} />
            <HatchlinkUiOperatorConsole
              readiness={readiness}
              selectedProfile={selectedProfile}
              setReadiness={setReadiness}
            />
            <HatchlinkFeatureVerifier />
          </div>
        </div>
      </div>
    </div>
  )
}
