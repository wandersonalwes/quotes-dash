import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/client'
import { Prisma } from '@prisma/client'
import { paramNumber } from '@/utils/paramNumber'
import { paramString } from '@/utils/paramString '

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const match = {} as Prisma.QuoteWhereInput

      if (req.query.published) {
        match.published = req.query.published === 'true'
      }

      if (req.query.user_id) {
        match.user = { id: paramNumber(req.query.user_id) }
      }

      if (req.query.category_id || req.query.categoryId) {
        match.categories = {
          some: {
            id: paramNumber(req.query.category_id) || paramNumber(req.query.categoryId)
          }
        }
      }

      if (req.query.category_name) {
        match.categories = {
          some: {
            name: paramString(req.query.category_name)
          }
        }
      }

      const perPage = paramNumber(req.query.per_page) || 20
      const page = paramNumber(req.query.page) - 1 || 0

      const quotes = await prisma.quote.findMany({
        where: match,
        orderBy: {
          content: 'asc'
        },
        include: {
          categories: true
        },
        skip: perPage * page,
        take: perPage
      })

      res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')

      return res.json(quotes)
    }

    case 'POST': {
      const { content, connectCategories, published } = req.body

      const session = await getSession({ req })

      const quoteExists = await prisma.quote.findUnique({
        where: {
          content
        }
      })

      if (quoteExists) {
        return res.status(400).json({ error: 'Frase já existe' })
      }

      if (session) {
        const quote = await prisma.quote.create({
          data: {
            content,
            categories: {
              connect: connectCategories.map((categoryName: string) => ({
                name: categoryName
              }))
            },
            published: session.user.isAdmin ? published : quoteExists.published,
            user: {
              connect: { id: session.user.id }
            }
          }
        })

        return res.json(quote.id)
      } else {
        return res.status(401)
      }
    }

    default: {
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
    }
  }
}
