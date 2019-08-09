import Web3 from 'web3';
import getWeb3 from './getWeb3';

const getAccounts = async (web3) => {
    web3 = web3 || await getWeb3();
    return await web3.eth.getAccounts();
}
const getInjectedAccountAddress = async (web3, accountNumber) => {
    accountNumber = accountNumber || 0;
    return  (await getAccounts())[accountNumber];
}

const getNetworkId = async (web3) => {
    web3 = web3 || await getWeb3();
    return await web3.eth.net.getId();
}

const contractMethodCall = async (contract, method, ...args) => {
    await getWeb3();//Ensure Web3 is fully loaded
    try{
        return await contract.methods[method](...args).call();
    } catch (e) {
        console.error(method, ...args);
        console.error(e);
        throw(e)
    }
}

const contractMethodTransaction = async (contract, method, ...args) => {
    let txOptions = args[args.length-1];
    if (args.length > 0 && !txOptions) { //remove UNDEFINED txOptions
        args = args.slice(0, args.length-1);
    }
    if (!txOptions || typeof txOptions !== 'object' || (!txOptions.from && !txOptions.data && !txOptions.gas && !txOptions.gasPrice)) {
        txOptions = {} //set default value for txOptions
    } else {
        args = args.slice(0, args.length-1); //remove txOptions from args array
    }
    await getWeb3();//Ensure Web3 is fully loaded
    txOptions = await prepTransactionOptions(txOptions);

    try{
        return await contract.methods[method](...args).send(txOptions);
    } catch (e) {
        console.error(method, ...args);
        console.error(e);
        throw(e)
    }
}

const contractGetPastEvents = async (contract, eventString, eventOptions) => {
    return contract.getPastEvents(eventString, eventOptions, function(error, events){ console.log(events);});
}

const prepTransactionOptions = async (txOptions={}) => {
    const cleanedOptions = {};
    cleanedOptions.from = txOptions.from || await getInjectedAccountAddress();
    if (txOptions.gas) {
        cleanedOptions.gas = txOptions.gas
    }
    if (txOptions.gasPrice) {
        cleanedOptions.gasPrice = txOptions.gasPrice
    }
    if (txOptions.data) {
        cleanedOptions.data = txOptions.data
    }
    return cleanedOptions;
}

const prepBigNumber = (number, decimals, inbound) => {//No Decimals in BigNumbers
    const bnNumber = Web3.utils.toBN(number);
    const bnDecimals = Web3.utils.toBN(10).pow(Web3.utils.toBN(decimals || 0));
    return (inbound ? bnNumber.div(bnDecimals) : bnNumber.mul(bnDecimals)).toString();
}

const prepNumber = (number, decimals, inbound) => {//Allows Decimals
    decimals = Math.pow(10, Number(decimals || 0));
    return (inbound ? Number(number)/ (decimals) : number * decimals).toString();
}


export {
    contractGetPastEvents,
    contractMethodCall,
    contractMethodTransaction,
    getAccounts,
    getInjectedAccountAddress,
    getNetworkId,
    prepBigNumber,
    prepNumber,
    prepTransactionOptions
}
