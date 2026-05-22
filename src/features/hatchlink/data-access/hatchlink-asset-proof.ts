import { fetchAssetV1 } from '@obrera/mpl-core-kit-lib/generated'
import { type Address, address } from '@solana/kit'

import type { SolanaClient } from '@/solana/data-access/solana-client'

import { type HatchMetadata, type HatchProof } from '../util/hatchlink-types'

export async function resolveHatchlinkAssetProof(client: SolanaClient, query: string): Promise<HatchProof> {
  const source = query.length > 60 ? 'signature' : 'asset'
  const assetAddress = source === 'signature' ? await getAssetFromSignature(client, query) : address(query)
  const asset = await fetchAssetV1(client.rpc, assetAddress, { commitment: 'confirmed' })
  const metadata = await getMetadata(asset.data.uri)

  return {
    assetAddress: String(asset.address),
    dataBytes: asset.data.uri.length + asset.data.name.length,
    metadata,
    name: asset.data.name,
    owner: String(asset.data.owner),
    source,
    updateAuthority: getUpdateAuthorityLabel(asset.data.updateAuthority),
    uri: asset.data.uri,
  }
}

async function getAssetFromSignature(client: SolanaClient, signature: string) {
  const transaction = await client.rpc
    .getTransaction(signature as never, {
      commitment: 'confirmed',
      encoding: 'jsonParsed',
      maxSupportedTransactionVersion: 0,
    })
    .send()

  const accountKeys = transaction?.transaction.message.accountKeys ?? []
  const assetKey = accountKeys.find((key) => !key.signer && key.writable)?.pubkey

  if (!assetKey) {
    throw new Error('Could not infer the MPL Core asset account from this signature.')
  }

  return address(assetKey)
}

async function getMetadata(uri: string) {
  if (!uri.startsWith('http')) {
    return undefined
  }

  const response = await fetch(uri).catch(() => undefined)

  if (!response?.ok) {
    return undefined
  }

  return (await response.json()) as HatchMetadata
}

function getUpdateAuthorityLabel(updateAuthority: { __kind: string; fields?: readonly [Address] }) {
  if (updateAuthority.__kind === 'Address' || updateAuthority.__kind === 'Collection') {
    return String(updateAuthority.fields?.[0] ?? 'unknown')
  }

  return updateAuthority.__kind
}
