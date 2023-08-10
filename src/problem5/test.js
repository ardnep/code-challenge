const { ethers } = require("ethers");

const ADDR = "0x72d082bf1e41791C2Aa25d1559ba6fFE4F07AE5A"   // your contract address
const ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "address[]",
                "name": "tokens",
                "type": "address[]"
            }
        ],
        "name": "getBalances",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "balance",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct TokenBalanceRetriever.Balance[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }
]// your contract ABI

const ADDRESS = "0xC91e1cAa23EdEfB24b193E4064A8080e013B64D5"; // some wallet address with token balance
const TOKENS = [    // token contract addresses
    "0x5f5D3F8e0BA943D95Bf3145194AC0c619b4Cc684",
    "0xE52952B8063d0AE6Bd35E894866d8148976ce645",
];

// you can use your own RPC provider url (no need to deploy to mainnet)
const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.public.blastapi.io');

const test = async () => {
    const contract = new ethers.Contract(ADDR, ABI, provider);

    const balances = await contract.getBalances(ADDRESS, TOKENS);

    return balances;
};

test().then(console.log);