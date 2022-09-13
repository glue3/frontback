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
export const initContract = async (
  isBackend = false,
  childContractName?: string
): Promise<NearContextType> => {
  const nearConfig = getConfig(process.env.NODE_ENV || 'testnet')
  let near = null
  let walletConnection = null

  // Initializing connection to the NEAR TestNet

  if (isBackend && childContractName) {
    const secretKey = process.env.PRIVATE_KEY || ''
    const keyPair = nearAPI.KeyPair.fromString(secretKey)
    const signer = await nearAPI.InMemorySigner.fromKeyPair(
      nearConfig.networkId,
      process.env.CONTRACT_NAME || '',
      keyPair
    )

    // Initializing connection to the NEAR TestNet
    near = await nearAPI.connect({
      ...nearConfig,
      headers: {},
      signer,
    })
  } else {
    near = await nearAPI.connect({
      ...nearConfig,
      headers: {},
      keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
    })

    // Needed to access wallet
    walletConnection = await new nearAPI.WalletConnection(near, 'GLU3')
  }

  // Load in account data
  let currentUser
  if (walletConnection?.getAccountId()) {
    currentUser = {
      accountId: walletConnection?.getAccountId(),
      balance: (await walletConnection?.account().state()).amount,
      isSignedIn: walletConnection?.isSignedIn(),
    }
  }

  const account = walletConnection
    ? walletConnection.account()
    : await near.account(process.env.CONTRACT_NAME || '')
  // Initializing our contract APIs by contract name and configuration
  const contract = await new nearAPI.Contract(
    account,
    //@ts-ignore
    isBackend ? childContractName : nearConfig.contractName,
    {
      // View methods are read-only – they don't modify the state, but usually return some value
      viewMethods: ['getTokenStats'],
      // Change methods can modify the state, but you don't receive the returned value when called
      changeMethods: [
        'deploy',
        'createToken',
        'burnToken',
        'mintToken',
        'ft_transfer',
        'sendToFund',
        'sendFromFund',
        'changeOwner',
      ],
    }
  )
  // @ts-ignore - Todo: verify whats the problem with Contract ts type
  return { contract, currentUser, nearConfig, walletConnection }
}
