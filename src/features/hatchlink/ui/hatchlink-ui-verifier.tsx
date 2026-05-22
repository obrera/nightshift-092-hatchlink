import { SearchCheck } from 'lucide-react'
import { type FormEvent, useState } from 'react'

import { Button } from '@/core/ui/button'
import { Input } from '@/core/ui/input'
import { Spinner } from '@/core/ui/spinner'

import type { HatchProof } from '../util/hatchlink-types'

export function HatchlinkUiVerifier({
  isVerifying,
  proof,
  verify,
}: {
  isVerifying: boolean
  proof?: HatchProof
  verify(query: string): void
}) {
  const [query, setQuery] = useState('')

  function submit(event: FormEvent) {
    event.preventDefault()
    if (query.trim()) {
      verify(query)
    }
  }

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-4">
        <p className="text-sm text-zinc-400">Asset / tx verifier</p>
        <h2 className="text-lg font-semibold">Resolve owner and metadata</h2>
      </div>
      <form className="flex flex-col gap-2 sm:flex-row" onSubmit={submit}>
        <Input
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="Asset address or transaction signature"
          value={query}
        />
        <Button disabled={isVerifying || !query.trim()} type="submit">
          {isVerifying ? <Spinner /> : <SearchCheck />}
          Verify
        </Button>
      </form>
      {proof ? (
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          {[
            ['Source', proof.source],
            ['Asset', proof.assetAddress],
            ['Owner', proof.owner],
            ['Update authority', proof.updateAuthority],
            ['Name', proof.name],
            ['Metadata URI', proof.uri],
          ].map(([label, value]) => (
            <div className="min-w-0 rounded-md border border-white/10 bg-black/20 p-3" key={label}>
              <p className="text-xs text-zinc-500">{label}</p>
              <p className="font-medium break-all">{value}</p>
            </div>
          ))}
          {proof.metadata ? (
            <div className="rounded-md border border-emerald-400/30 bg-emerald-400/10 p-3 sm:col-span-2">
              <p className="text-xs text-emerald-200">Resolved media</p>
              <p className="break-all text-zinc-200">{proof.metadata.image}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
