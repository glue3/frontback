export interface CryptoInputPropsType {
  value?: string
  onChange: (value: string) => void
  onChangeCurrency?: (e: string) => void
  maxValue?: string
  currencyQuote?: number
  showBalance?: boolean
}

export enum CurrencyTypeEnum {
  NEAR = 'NEAR',
  GLU3 = 'GLU3',
}
