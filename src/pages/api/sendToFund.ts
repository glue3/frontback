import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { initContract } from 'src/near/initContract'

const prisma = new PrismaClient()

// Allows tokens to be saved in temporary funds
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { apiKey, amount, id } = req.query
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
      await contract?.sendToFund({ amount, id })
      res.status(200).json({ message: 'Tokens sent to the temporary fund.' })
    }
  } else {
    res.status(404).json({ error: 'Method does not exist' })
  }
}
