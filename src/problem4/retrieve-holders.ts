import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');

const tokenAddr: string = '0xc0ecb8499d8da2771abcbf4091db7f65158f1468';
const tokenABI: string[] = [
    'function balanceOf(address account) view returns(uint256)',
    'function decimals() view returns (uint8)'
]
const tokenContract = new ethers.Contract(tokenAddr, tokenABI, provider);


async function retrieveHolders(addressToLookup: string[]) {
    const holders: { address: string, balance: string }[] = [];

    const decimals = await tokenContract.decimals();

    for (const address of addressToLookup) {
        const balance = await tokenContract.balanceOf(address);
        const parsedBalance = ethers.utils.commify(ethers.utils.formatUnits(balance, decimals));
        holders.push({
            address: address,
            balance: parsedBalance
        });
    }

    return holders;
}

async function main() {
    const addressToLookup = [
        '0xb5d4f343412dc8efb6ff599d790074d0f1e8d430',
        '0x0020c5222a24e4a96b720c06b803fb8d34adc0af',
        '0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392'
    ]

    const holders = await retrieveHolders(addressToLookup);

    for (const holder of holders) {
        console.log(`${holder.address} ${holder.balance}`);
    }
}

main();