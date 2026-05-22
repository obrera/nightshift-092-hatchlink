import { createSolanaRpc, createSolanaRpcSubscriptions } from '@solana/kit'

import { resolveHatchlinkAssetProof } from '../src/features/hatchlink/data-access/hatchlink-asset-proof'

const query = process.argv[2]

if (!query) {
  throw new Error('Usage: bun run proof:verify <asset-address-or-transaction-signature>')
}

const proof = await resolveHatchlinkAssetProof(
  {
    rpc: createSolanaRpc('https://api.devnet.solana.com'),
    rpcSubscriptions: createSolanaRpcSubscriptions('wss://api.devnet.solana.com'),
  },
  query,
)

console.log(`asset=${proof.assetAddress}`)
console.log(`owner=${proof.owner}`)
console.log(`updateAuthority=${proof.updateAuthority}`)
console.log(`name=${proof.name}`)
console.log(`uri=${proof.uri}`)
console.log(`source=${proof.source}`)
console.log(`dataBytes=${proof.dataBytes}`)
