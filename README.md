# CryptoDudes

Basic NFT game

## Installation

Paste your keys to `.env` file

### .env

- API_URL: Alchemy or any other Provider endpoint (Default: Rinkeby)
- PRIVATE_KEY: Private key for the deployer account

```bash
# Build smart contracts
$ build:contracts

$ deploy:contracts
# ⚠️ Copy NFT and Game contracts address from output
# ⚠️ To `src/shared/config/index.ts`

# Start frontend application
$ yarn start
```
