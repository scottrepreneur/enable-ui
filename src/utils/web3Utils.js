import Web3 from 'web3'
import getWeb3 from './getWeb3'

const BN = number => Web3.utils.toBN(number)

const getNetworkId = async web3 => {
    web3 = web3 || (await getWeb3())
    return await web3.eth.net.getId()
}

const getNetworkName = async () => {
    const networkId = +(await getNetworkId())
    switch (networkId) {
        case 1:
            return 'mainnet'
        case 3:
            return 'ropsten'
        case 4:
            return 'rinkeby'
        case 42:
            return 'kovan'
        default:
            return 'localhost'
    }
}

const connectToWallet = async () => {
    return await window.ethereum.enable()
}

const getAccounts = async web3 => {
    web3 = web3 || (await getWeb3())
    return await web3.eth.getAccounts()
}

const getInjectedAccountAddress = async accountNumber => {
    accountNumber = accountNumber || 0
    return (await getAccounts())[accountNumber]
}

const getBlock = async block => {
    const web3 = await getWeb3()
    return await web3.eth.getBlock(block)
}

const getTransaction = async hash => {
    const web3 = await getWeb3()
    return await web3.eth.getTransaction(hash)
}

const contractMethodCall = async (contract, method, ...args) => {
    await getWeb3() //Ensure Web3 is fully loaded
    try {
        return await contract.methods[method](...args).call()
    } catch (e) {
        console.error(method, ...args)
        console.error(e)
        throw e
    }
}

const contractMethodTransaction = async (contract, method, ...args) => {
    let txOptions = args[args.length - 1]
    if (args.length > 0 && !txOptions) {
        //remove UNDEFINED txOptions
        args = args.slice(0, args.length - 1)
    }
    if (
        !txOptions ||
        typeof txOptions !== 'object' ||
        (!txOptions.from &&
            !txOptions.data &&
            !txOptions.gas &&
            !txOptions.gasPrice)
    ) {
        txOptions = {} //set default value for txOptions
    } else {
        args = args.slice(0, args.length - 1) //remove txOptions from args array
    }
    await getWeb3() //Ensure Web3 is fully loaded
    txOptions = await prepTransactionOptions(txOptions)

    try {
        return await contract.methods[method](...args).send(txOptions)
    } catch (e) {
        console.error(method, ...args)
        console.error(e)
        throw e
    }
}

const contractGetEvents = (
    contract,
    eventString = 'allEvents',
    eventOptions
) => {
    try {
        eventOptions = prepEventOptions(eventOptions)
        return contract.events[eventString](eventOptions)
    } catch (e) {
        console.error(eventString, eventOptions, contract)
        console.error(e)
        throw e
    }
}

const contractGetPastEvents = (contract, eventString, eventOptions) => {
    try {
        eventOptions = prepEventOptions(eventOptions)
        return contract.getPastEvents(eventString, eventOptions)
    } catch (e) {
        console.error(eventString, eventOptions, contract)
        console.error(e)
        throw e
    }
}

const prepTransactionOptions = async (txOptions = {}) => {
    const cleanedOptions = {}
    cleanedOptions.from = txOptions.from || (await getInjectedAccountAddress())
    if (txOptions.gas) {
        cleanedOptions.gas = txOptions.gas
    }
    if (txOptions.gasPrice) {
        cleanedOptions.gasPrice = txOptions.gasPrice
    }
    if (txOptions.data) {
        cleanedOptions.data = txOptions.data
    }
    return cleanedOptions
}

const prepEventOptions = ({ filter, topics, fromBlock, toBlock }) => {
    const eventOptions = {}
    if (filter && Object.keys(filter).length > 0) eventOptions.filter = filter
    if (topics && topics.length > 0) eventOptions.topics = topics
    if (typeof fromBlock !== 'undefined') eventOptions.fromBlock = fromBlock
    if (typeof toBlock !== 'undefined') eventOptions.toBlock = toBlock

    return eventOptions
}

const prepBigNumber = (number, decimals, inbound) => {
    //No Decimals in BigNumbers
    const bnNumber = BN(number)
    const bnDecimals = BN(10).pow(BN(decimals || 0))
    return (inbound
        ? bnNumber.div(bnDecimals)
        : bnNumber.mul(bnDecimals)
    ).toString()
}

const prepNumber = (number, decimals, inbound) => {
    //Allows Decimals
    decimals = Math.pow(10, +decimals || 0)
    return (inbound ? +number / decimals : number * decimals).toString()
}

export {
    BN,
    connectToWallet,
    contractGetEvents,
    contractGetPastEvents,
    contractMethodCall,
    contractMethodTransaction,
    getAccounts,
    getBlock,
    getInjectedAccountAddress,
    getNetworkId,
    getNetworkName,
    getTransaction,
    prepBigNumber,
    prepNumber,
    prepTransactionOptions,
}
