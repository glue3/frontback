import { useState, useEffect, useContext, FunctionComponent } from 'react'
import { utils } from 'near-api-js'

import { NearContext } from 'src/near/nearContext'

// Todo: replace by redux-toolkit query
export const useGetBalance: () => {
  isLoading: boolean
  nearBalance: string
  refetch: () => Promise<void>
  tokenBalance: string
} = () => {
  const { contract, currentUser, walletConnection } = useContext(NearContext)
  const [tokenBalance, setTokenBalance] = useState<string>('')
  const [nearBalance, setNearBalance] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchBalance = async () => {
    try {
      setIsLoading(true)
      // Get GLU3 balance
      const gluRes = await walletConnection
        ?.account()
        .viewFunction(contract?.contractId || '', 'ft_balance_of', {
          account_id: currentUser?.accountId,
        })
      const newTokenBalance = utils.format.formatNearAmount(gluRes || '0')
      setTokenBalance(Number(newTokenBalance || 0).toFixed(3))
      // Get Near balance
      const newNearBalance = utils.format.formatNearAmount(
        currentUser?.balance || '0'
      )
      setNearBalance(Number(newNearBalance || 0).toFixed(3))
    } catch (e) {
      // Todo: add a toaster warning of errors
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBalance()
  }, [contract])

  return {
    tokenBalance,
    nearBalance,
    isLoading,
    refetch: fetchBalance,
  }
}
