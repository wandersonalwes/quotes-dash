import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { Prisma } from '@prisma/client'
import { paramNumber } from '@/utils/paramNumber'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const match = {} as Prisma.QuoteWhereInput

    if (req.query.user_id) {
      match.user = { id: paramNumber(req.query.user_id) }
    }

    if (req.query.category_id) {
      match.categories = { some: { id: paramNumber(req.query.category_id) } }
    }

    const total = await prisma.quote.count({
      where: match
    })
    return res.json(total)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}
