import prisma from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  const categoryId = Number(req.query.id)
  const session = await getSession({ req })

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

      if (!session.user.isAdmin) {
        return res.status(403).json({ error: 'Sem permissão para realizar está ação' })
      }

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
      if (!session.user.isAdmin) {
        return res.status(403).json({ error: 'Sem permissão para realizar está ação' })
      }

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
