import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const total = await prisma.user.count()
    return res.json(total)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}
