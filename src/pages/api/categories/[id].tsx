import prisma from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import slugify from 'slugify'

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

      if (!category) {
        return res.status(404).json({ error: 'Frase não encontrada' })
      }

      return res.json(category)
    }

    case 'PUT': {
      const { name, slug } = req.body

      if (!session.user.isAdmin) {
        return res.status(403).json({ error: 'Sem permissão para realizar está ação' })
      }

      const categoryExists = await prisma.category.findUnique({
        where: {
          name
        }
      })

      const currentCategory = await prisma.category.findUnique({
        where: {
          id: categoryId
        }
      })

      if (categoryExists && currentCategory.name !== name) {
        return res.status(400).json({ error: 'Categoria já existe' })
      }

      const category = await prisma.category.update({
        where: {
          id: categoryId
        },
        data: {
          name,
          slug: slugify(slug, { lower: true })
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
