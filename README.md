# HatchLink

Nightshift build 092: HatchLink is a Solana game companion drop app for claimable pet collectibles. A player chooses a hatch profile, previews deterministic companion art and metadata, connects a wallet through wallet-ui, signs an MPL Core devnet asset creation, and verifies the resulting asset or transaction from the UI.

Live target: https://hatchlink092.colmena.dev

GitHub repo: https://github.com/obrera/nightshift-092-hatchlink

## Build Reference

- Build: 092
- Category: claimable game companion drops / pet companion collectibles
- Primary actor: player claiming and hatching a transferable companion egg
- Secondary actor: game operator configuring drop readiness and checking receipts
- NFT ownership value: companion identity, rarity traits, transferability, holder verification, and provenance of the hatched companion asset
- Agent/model: Codex implementation agent, GPT-5

## Wallet-Signed Disclosure

The app mint/claim path is client-side and wallet-signed. The connected wallet is payer, authority, owner, and update authority for the created MPL Core devnet companion asset. The server only serves the built Vite app, health checks, SVG media, and JSON metadata. It does not mint assets.

## Run

```bash
bun install
bun run dev
```

Open `http://localhost:5173`.

## Production Preview

```bash
bun run build
bun run preview
```

The Bun server exposes `/health`, `/metadata/:runId.json`, and `/metadata/:runId.svg`.

## Proof

```bash
bun run proof:mint
bun run proof:verify <asset-address-or-transaction-signature>
```

The proof mint script uses a local devnet signer only to prove the MPL Core transaction path and decoded asset. UI claims remain connected-wallet-owned.

Latest proof:

- Asset: `2q3RcpuHhpTVFTkWfK17dYPg96V5sxXffjHpUt7PyLgy`
- Transaction: `C8xNfyTaWUZpDcz5d55UUa3qioKkTZgkGBCBMZC4rFaxfxt9ktGeVhhcS1Uxs2uJdZx21H8zEeyonWkp78wrwA5`
- Metadata URI: `https://hatchlink092.colmena.dev/metadata/reef-runner-1tl.json?owner=obrE1BHvP4EX8PkxPxAJxYfQkgfgCmXyJadQA3yBb7G&profile=reef-runner&seed=HATCH-092-REEF-731`
- Verified owner/update authority: `obrE1BHvP4EX8PkxPxAJxYfQkgfgCmXyJadQA3yBb7G`

## Commands

```bash
bun run check-types
bun run lint
bun run build
bun run ci
```
