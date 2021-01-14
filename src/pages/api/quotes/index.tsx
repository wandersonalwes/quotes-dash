import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/client'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const perPage = 20
      const page = Number(req.query.page) - 1 || 0

      const quotes = await prisma.quote.findMany({
        orderBy: {
          content: 'asc'
        },
        include: {
          categories: true
        },
        skip: perPage * page,
        take: perPage
      })
      return res.json(quotes)
    }

    case 'POST': {
      const { content, connectCategories } = req.body

      const session = await getSession({ req })

      const quote = await prisma.quote.create({
        data: {
          content,
          categories: {
            connect: connectCategories.map((categoryName: string) => ({
              name: categoryName
            }))
          },
          user: {
            connect: { email: session?.user?.email }
          }
        }
      })

      return res.json(quote.id)
    }

    default: {
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
    }
  }
}
