import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next-auth/_utils'
import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/client'
import slugify from 'slugify'
import { Prisma } from '@prisma/client'
import { paramString } from '@/utils/paramString '

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, slug } = req.body

    const session = await getSession({ req })

    if (!session.user.isAdmin) {
      return res.status(403).json({ error: 'Sem permissão para realizar está ação' })
    }

    const categoryExists = await prisma.category.findUnique({
      where: {
        name
      }
    })

    if (categoryExists) {
      return res.status(400).json({ error: 'Categoria já existe' })
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug: slugify(slug, { lower: true })
      }
    })

    return res.json(category)
  }

  if (req.method === 'GET') {
    const match = {} as Prisma.CategoryWhereInput

    if (req.query.slug) {
      match.slug = paramString(req.query.slug)
    }

    const categories = await prisma.category.findMany({
      where: match,
      orderBy: {
        name: 'asc'
      }
    })
    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
    res.json(categories)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}
