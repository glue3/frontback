import { useState, useEffect, useContext } from 'react'
import { utils } from 'near-api-js'

import { NearContext } from 'src/near/nearContext'

import { TokenStatsType } from 'src/near/types'

// Todo: replace by redux-toolkit query
export const useGetStats: () => {
  stats: TokenStatsType | null
  isLoading: boolean
  refetch: () => void
} = () => {
  const { contract, currentUser } = useContext(NearContext)
  const [stats, setStats] = useState<TokenStatsType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getStats = async () => {
    if (currentUser?.accountId) {
      return contract?.getTokenStats({
        account: currentUser?.accountId,
      })
    }
  }

  const fetchStats = async () => {
    try {
      setIsLoading(true)
      const newStats = await getStats()

      setStats({
        token_amount: utils.format.formatNearAmount(
          newStats?.token_amount || '0'
        ),
        tokens_distributed: utils.format.formatNearAmount(
          newStats?.tokens_distributed || '0'
        ),
        tokens_on_fund: utils.format.formatNearAmount(
          newStats?.tokens_on_fund || '0'
        ),
      })
    } catch (e) {
      // Todo: add a toaster warning of errors
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [contract])

  return {
    stats,
    isLoading,
    refetch: fetchStats,
  }
}
