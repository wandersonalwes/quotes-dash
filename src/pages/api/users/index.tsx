import { NextApiHandler } from 'next'
import prisma from '../../lib/prisma'

const handle: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const users = await prisma.user.findMany()

      return res.json(users)
    }
  }
}

export default handle
