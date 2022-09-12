import * as nearAPI from 'near-api-js'
import { getConfig } from './config'
import { ContractType } from 'src/near/types'

export interface NearContextType {
  contract: ContractType | null
  walletConnection: nearAPI.WalletConnection | null
  currentUser?: {
    accountId: string
    balance: string
    isSignedIn: boolean
  } | null
  nearConfig: {
    networkId: string
    nodeUrl: string
    contractName: string
    walletUrl: string
    helperUrl: string
  } | null
}

// Initializing contract
export const initContract = async (): Promise<NearContextType> => {
  const nearConfig = getConfig(process.env.NODE_ENV || 'testnet')

  // Initializing connection to the NEAR TestNet
  const near = await nearAPI.connect({
    ...nearConfig,
    headers: {},
    keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
  })

  // Needed to access wallet
  const walletConnection = await new nearAPI.WalletConnection(near, 'GLU3')

  // Load in account data
  let currentUser
  if (walletConnection.getAccountId()) {
    currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount,
      isSignedIn: walletConnection.isSignedIn(),
    }
  }

  // Initializing our contract APIs by contract name and configuration
  const contract = await new nearAPI.Contract(
    walletConnection.account(),
    nearConfig.contractName,
    {
      // View methods are read-only – they don't modify the state, but usually return some value
      viewMethods: ['getTokenStats'],
      // Change methods can modify the state, but you don't receive the returned value when called
      changeMethods: [
        'deploy',
        'createToken',
        'burnToken',
        'mintToken',
        'sendToken',
        'sendToFund',
        'sendFromFund',
        'changeOwner',
      ],
    }
  )
  // @ts-ignore - Todo: verify whats the problem with Contract ts type
  return { contract, currentUser, nearConfig, walletConnection }
}
