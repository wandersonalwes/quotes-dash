import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  const quoteId = Number(req.query.id)

  switch (req.method) {
    case 'GET': {
      const quote = await prisma.quote.findUnique({
        where: {
          id: quoteId
        },
        include: {
          categories: true
        }
      })

      if (!quote) {
        return res.status(404).json({ error: 'Frase não encontrada' })
      }

      return res.json(quote)
    }

    case 'PUT': {
      const { content, connectCategories, disconnectCategories } = req.body

      const quoteExists = await prisma.quote.findUnique({
        where: {
          content
        }
      })

      const currentQuote = await prisma.quote.findUnique({
        where: {
          id: quoteId
        }
      })

      if (quoteExists && quoteExists.content !== currentQuote.content) {
        return res.status(400).json({ error: 'Frase já existe' })
      }

      const quote = await prisma.quote.update({
        where: {
          id: quoteId
        },
        data: {
          content,
          categories: {
            connect: connectCategories.map((categoryName: string) => ({
              name: categoryName
            })),
            disconnect: disconnectCategories.map((categoryName: string) => ({
              name: categoryName
            }))
          }
        }
      })

      return res.json(quote)
    }

    case 'DELETE': {
      const quote = await prisma.quote.delete({
        where: {
          id: quoteId
        }
      })
      return res.json(quote)
    }

    default: {
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
    }
  }
}
