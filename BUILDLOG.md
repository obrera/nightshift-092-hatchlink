# HatchLink Build Log

## 2026-05-22

- Build: 092
- Project: HatchLink
- Repo: nightshift-092-hatchlink
- Live target: https://hatchlink092.colmena.dev
- Category: claimable game companion drops / pet companion collectibles
- Actor/job: player claims and hatches a transferable companion egg; operator validates drop readiness and receipts
- Why NFT ownership matters: companion identity, rarity traits, transferability, holder verification, and provenance
- Agent/model: Codex implementation agent, GPT-5

## Scorecard

- Feature-based structure: `src/features/hatchlink/{data-access,feature,ui,util}`
- User capabilities:
  - Hatch profile and drop seed builder
  - Generated SVG art and JSON metadata preview
  - wallet-ui connected-wallet MPL Core devnet asset claim
  - Asset/signature verifier resolving owner, update authority, URI, media, attributes
  - Operator readiness, supply, and rarity console
- Dependencies: `@obrera/mpl-core-kit-lib`, wallet-ui, Solana Kit
- Minting rule: no server mint path; UI claim is wallet-signed

## Live Proof

- Asset: `2q3RcpuHhpTVFTkWfK17dYPg96V5sxXffjHpUt7PyLgy`
- Transaction: `C8xNfyTaWUZpDcz5d55UUa3qioKkTZgkGBCBMZC4rFaxfxt9ktGeVhhcS1Uxs2uJdZx21H8zEeyonWkp78wrwA5`
- Verification command: `bun run proof:verify 2q3RcpuHhpTVFTkWfK17dYPg96V5sxXffjHpUt7PyLgy`
- Verified owner/update authority: `obrE1BHvP4EX8PkxPxAJxYfQkgfgCmXyJadQA3yBb7G`
- Local HTTP check: `curl http://127.0.0.1:39392/health` returned 200
- Live HTTP check: `curl -I https://hatchlink092.colmena.dev/health` returned HTTP 200
