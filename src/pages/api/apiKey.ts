import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { generateApiKey } from 'generate-api-key'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req
  if (req.method === 'GET') {
    const { wallet } = req.query
    if (wallet) {
      const apiKey = await prisma.apiKeyTestnet.findUnique({
        where: {
          wallet: String(wallet),
        },
      })
      res.json(apiKey)
    }
  } else if (req.method === 'POST') {
    const newApiKey = await generateApiKey({
      method: 'base32',
      prefix: 'glu3_testnet',
    })
    // create apiKey
    const apiKey = await prisma.apiKeyTestnet.create({
      data: {
        wallet: body.wallet,
        // @ts-ignore In this case it is returning a string and not a string[]
        apiKey: newApiKey,
      },
    })

    res.json(apiKey)
  } else if (req.method === 'PUT') {
    // PUT method generates a new random api key
    const wallet = body.wallet
    const data = JSON.parse(req.body)
    const apiKey = await prisma.apiKeyTestnet.update({
      where: { wallet },
      data: {
        ...data,
        apiKey: generateApiKey({ method: 'base32', prefix: 'glu3_testnet' }),
      },
    })

    res.json(apiKey)
  } else if (req.method === 'DELETE') {
    const wallet = req.query.wallet as string
    await prisma.apiKeyTestnet.delete({ where: { wallet } })

    res.json({ status: 'ok' })
  }
}
