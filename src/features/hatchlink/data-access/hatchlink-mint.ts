import { getCreateV1Instruction } from '@obrera/mpl-core-kit-lib/generated'
import {
  appendTransactionMessageInstruction,
  assertIsTransactionMessageWithSingleSendingSigner,
  compileTransactionMessage,
  createTransactionMessage,
  generateKeyPairSigner,
  getBase58Decoder,
  getBase64Decoder,
  getCompiledTransactionMessageEncoder,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signAndSendTransactionMessageWithSigners,
  type TransactionMessageBytesBase64,
} from '@solana/kit'
import { type useWalletUiSigner } from '@wallet-ui/react'

import type { SolanaClient } from '@/solana/data-access/solana-client'

import { createMetadataUri } from '../util/hatchlink-metadata'
import { type HatchClaimResult, type HatchProfile } from '../util/hatchlink-types'

export async function claimHatchCompanion({
  client,
  origin,
  profile,
  transactionSigner,
}: {
  client: SolanaClient
  origin: string
  profile: HatchProfile
  transactionSigner: ReturnType<typeof useWalletUiSigner>
}): Promise<HatchClaimResult> {
  const asset = await generateKeyPairSigner()
  const metadataUri = createMetadataUri({ origin, owner: String(transactionSigner.address), profile })
  const { value: latestBlockhash } = await client.rpc.getLatestBlockhash({ commitment: 'confirmed' }).send()
  const message = pipe(
    createTransactionMessage({ version: 0 }),
    (transactionMessage) => setTransactionMessageFeePayerSigner(transactionSigner, transactionMessage),
    (transactionMessage) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, transactionMessage),
    (transactionMessage) =>
      appendTransactionMessageInstruction(
        getCreateV1Instruction({
          asset,
          authority: transactionSigner,
          name: `HatchLink ${profile.species}`,
          owner: transactionSigner.address,
          payer: transactionSigner,
          updateAuthority: transactionSigner.address,
          uri: metadataUri,
        }),
        transactionMessage,
      ),
  )

  assertIsTransactionMessageWithSingleSendingSigner(message)

  const encodedMessage = getCompiledTransactionMessageEncoder().encode(compileTransactionMessage(message))
  const [{ value: balance }, { value: fee }] = await Promise.all([
    client.rpc.getBalance(transactionSigner.address, { commitment: 'confirmed' }).send(),
    client.rpc
      .getFeeForMessage(getBase64Decoder().decode(encodedMessage) as TransactionMessageBytesBase64, {
        commitment: 'confirmed',
      })
      .send(),
  ])

  if (fee === null) {
    throw new Error('Unable to estimate this claim transaction fee.')
  }
  if (balance < fee) {
    throw new Error('Connected wallet needs devnet SOL for rent and fees.')
  }

  const signatureBytes = await signAndSendTransactionMessageWithSigners(message)
  const signature = getBase58Decoder().decode(signatureBytes)

  return { assetAddress: asset.address, metadataUri, signature }
}
