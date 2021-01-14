import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next-auth/_utils'
import prisma from '@/lib/prisma'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name } = req.body

    const category = await prisma.category.create({
      data: {
        name
      }
    })

    return res.json(category)
  }

  if (req.method === 'GET') {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    res.json(categories)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}
