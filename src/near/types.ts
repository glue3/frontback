import * as nearAPI from 'near-api-js'

export interface TokenStatsType {
  token_amount: string
  tokens_distributed: string
  tokens_on_fund: string
}

export interface CreateTokenPropsType {
  tokenName: string
  symbol: string
  supply: string
  decimals: number
  canMint: boolean
  canBurn: boolean
}

export interface ContractType extends nearAPI.Contract {
  /*
   * Change Methods
   */
  deploy: ({}, gas: string | null, deposit?: string | null) => void
  createToken: (
    {
      tokenName,
      symbol,
      supply,
      decimals,
      canMint,
      canBurn,
    }: CreateTokenPropsType,
    gas?: string,
    deposit?: string
  ) => void
  ft_transfer: (
    { receiver_id, amount }: { amount: string | null; receiver_id: string },
    gas?: string,
    deposit?: string
  ) => void
  storage_deposit: (
    { account_id }: { account_id: string },
    gas?: string,
    deposit?: string
  ) => void

  /*
   * View Methods
   */
  // Get Token Stats
  getTokenStats: (
    { account }: { account: string },
    gas?: string,
    deposit?: string
  ) => Promise<TokenStatsType>
}
