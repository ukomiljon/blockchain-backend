# Web3 Backend Challenge Ideas

Here are some challenge ideas that avoid complexity, can be solved using web3.js or APIs, and focus on backend code using NestJS and MongoDB. Choose **3 tasks** that you are confident in and can accomplish.

## Selected Challenges

- [x] **1. NFT Metadata Retrieval and Storage**  
  **The Challenge:** Create an API endpoint that accepts an NFT contract address and token ID. It should retrieve the metadata (name, description, image URL) from the blockchain using web3.js, store it in MongoDB, and return the metadata to the user.  
  **Focus:** Demonstrates understanding of web3.js interaction with smart contracts, handling data from the blockchain, and basic database integration.

- [x] **2. Simple Cryptocurrency Transaction Tracking**  
  **The Challenge:** Build an API endpoint that accepts a cryptocurrency address (Ethereum, for example). It should retrieve the last 5 transactions for that address from a blockchain explorer API (e.g., Etherscan) and store them in MongoDB. Allow users to query for transactions by address and date range.  
  **Focus:** Exposes knowledge of external APIs, data parsing, and efficient database storage.

- [x] **3. Decentralized Storage (IPFS Integration)**  
  **The Challenge:** Create an API endpoint that allows users to store text data on IPFS using the IPFS API. The endpoint should store the IPFS hash of the data in MongoDB and provide a way for users to retrieve the data using the stored hash.  
  **Focus:** Demonstrates understanding of decentralized storage concepts, integrating with external APIs, and data persistence.

- [ ] **4. Token Balance Lookup**  
  **The Challenge:** Build an API endpoint that accepts a token contract address and a wallet address. It should query the blockchain (using web3.js) to retrieve the balance of the specified token held by the wallet address and return the balance.  
  **Focus:** Understanding of token contracts and token balance retrieval through web3.js.

- [ ] **5. Basic Smart Contract Interaction**  
  **The Challenge:** Create a pre-deployed simple ERC20 token contract on a testnet. Build an API endpoint that allows users to transfer tokens between wallets using the contract. The endpoint should update the MongoDB database with the latest transaction data.  
  **Focus:** Basic understanding of smart contract interactions, transaction handling, and integration with a blockchain.

## Important Considerations

- **Testnet:** For security and cost-effectiveness, use a blockchain testnet (like Rinkeby or Goerli for Ethereum).
- **Evaluation Criteria:** Define clear evaluation criteria for the challenge, such as code readability, efficiency, error handling, and adherence to best practices.

## How to Run

1. Start the application using Docker Compose:

   ```bash
   docker compose up --build    
   yarn start:dev

2. Open postman from root folder and can test it.


Do not forgot to add .env file before start:

   # Etherscan API Configuration
    ETHERSCAN_API_URL='https://api.etherscan.io/api'
    ETHERSCAN_API_KEY=''

    # Infura API Configuration
    INFURA_SECRET='T'
    INFURA_PROJECT_ID=''

    # Pinata API Configuration
    IPFS_PINATA_API_URL='https://api.pinata.cloud/pinning/pinJSONToIPFS'
    PINATA_API_KEY=''
    PINATA_SECRET_API_KEY=''

    # Web3 Configuration
    WEB3_URL='https://mainnet.infura.io/v3/{INFURA_PROJECT_ID}'

    # MongoDB Configuration
    MONGODB_URL='mongodb://host.docker.internal:27017/blockchain-app' # if API runs out of Docker
    # MONGODB_URL='mongodb://admin:admin@mongo-db:27017/blockchain-app' # if API runs inside of Docker
    MONGODB_HOST='host.docker.internal'
    # MONGODB_HOST='mongo-db'
    MONGODB_PORT=27017
    MONGODB_DB='blockchain-app'
    MONGODB_USERNAME='admin'
    MONGODB_PASSWORD='admin'

    # Application Port
    PORT=3000


