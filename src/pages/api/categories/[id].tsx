import prisma from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  const categoryId = Number(req.query.id)

  switch (req.method) {
    case 'GET': {
      const category = await prisma.category.findUnique({
        where: {
          id: categoryId
        }
      })

      return res.json(category)
    }

    case 'PUT': {
      const { name } = req.body

      const category = await prisma.category.update({
        where: {
          id: categoryId
        },
        data: {
          name
        }
      })

      return res.json(category)
    }

    case 'DELETE': {
      const category = await prisma.category.delete({
        where: {
          id: categoryId
        }
      })

      return res.json(category)
    }

    default: {
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
    }
  }
}
