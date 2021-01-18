import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const random = await prisma.$queryRaw('SELECT * FROM quotes ORDER BY random() LIMIT 1;')
    return res.json(random[0])
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}
