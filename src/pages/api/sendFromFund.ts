import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { utils } from 'near-api-js'

import { initContract } from 'src/near/initContract'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { amount, id, walletAddress, apiKey } = req.body
    if (apiKey) {
      const response = await prisma.apiKeyTestnet.findUnique({
        where: {
          apiKey: String(apiKey),
        },
      })
      const walletToSend = response?.wallet || ''
      const contractName = `${walletToSend.replace('.testnet', '')}.${
        process.env.CONTRACT_NAME
      }`
      const { contract } = await initContract(true, contractName)
      // @ts-ignore
      await contract?.sendFromFund({
        amount: utils.format.parseNearAmount(amount) || '0',
        id,
        walletAddress,
      })
      res.status(200).json({ message: 'Tokens transferred to a real wallet.' })
    }
  } else {
    res.status(404).json({ error: 'Method does not exist' })
  }
}
