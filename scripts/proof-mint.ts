import { getCreateV1Instruction } from '@obrera/mpl-core-kit-lib/generated'
import {
  type Address,
  appendTransactionMessageInstruction,
  assertIsTransactionWithBlockhashLifetime,
  createKeyPairSignerFromBytes,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  createTransactionMessage,
  generateKeyPairSigner,
  getSignatureFromTransaction,
  lamports,
  pipe,
  sendAndConfirmTransactionFactory,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners,
} from '@solana/kit'

import { findHatchProfile } from '../src/features/hatchlink/data-access/hatchlink-catalog'
import { createMetadataUri } from '../src/features/hatchlink/util/hatchlink-metadata'

const keypairPath =
  process.env.HATCHLINK_KEYPAIR ?? '/home/obrera/keys/obrE1BHvP4EX8PkxPxAJxYfQkgfgCmXyJadQA3yBb7G.json'
const rpc = createSolanaRpc('https://api.devnet.solana.com')
const rpcSubscriptions = createSolanaRpcSubscriptions('wss://api.devnet.solana.com')
const sendAndConfirmTransaction = sendAndConfirmTransactionFactory({ rpc, rpcSubscriptions })

async function fundPayer(address: Address) {
  const balance = await rpc.getBalance(address, { commitment: 'confirmed' }).send()

  if (balance.value >= 50_000_000n) {
    return
  }

  await rpc.requestAirdrop(address, lamports(1_000_000_000n)).send()
}

async function loadSigner() {
  const secret = JSON.parse(await Bun.file(keypairPath).text()) as number[]

  return createKeyPairSignerFromBytes(Uint8Array.from(secret))
}

async function main() {
  const payer = await loadSigner()
  const asset = await generateKeyPairSigner()
  const profile = findHatchProfile(process.argv[2] ?? 'reef-runner')
  const uri = createMetadataUri({ origin: 'https://hatchlink092.colmena.dev', owner: String(payer.address), profile })

  await fundPayer(payer.address)

  const { value: latestBlockhash } = await rpc.getLatestBlockhash({ commitment: 'confirmed' }).send()
  const message = pipe(
    createTransactionMessage({ version: 0 }),
    (transactionMessage) => setTransactionMessageFeePayerSigner(payer, transactionMessage),
    (transactionMessage) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, transactionMessage),
    (transactionMessage) =>
      appendTransactionMessageInstruction(
        getCreateV1Instruction({
          asset,
          authority: payer,
          name: `HatchLink ${profile.species}`,
          owner: payer.address,
          payer,
          updateAuthority: payer.address,
          uri,
        }),
        transactionMessage,
      ),
  )

  const transaction = await signTransactionMessageWithSigners(message)

  assertIsTransactionWithBlockhashLifetime(transaction)
  await sendAndConfirmTransaction(transaction, { commitment: 'confirmed' })

  console.log(`asset=${asset.address}`)
  console.log(`tx=${getSignatureFromTransaction(transaction)}`)
  console.log(`uri=${uri}`)
  console.log(`explorer=https://explorer.solana.com/address/${asset.address}?cluster=devnet`)
}

await main()
