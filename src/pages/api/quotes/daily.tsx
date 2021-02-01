import prisma from '@/lib/prisma'
import { format, isAfter } from 'date-fns'
import { NextApiHandler } from 'next'

const handle: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const [random] = await prisma.$queryRaw('SELECT * FROM quotes ORDER BY random() LIMIT 1;')

    const dailyQuote = await prisma.daily.findUnique({ where: { id: 1 } })

    if (!dailyQuote) {
      const response = await prisma.daily.create({
        data: {
          id: 1,
          content: random.content
        }
      })

      res.json(response)
    }

    const updateBeforeToday = (lastUpdate: Date) => {
      const nowFormatted = format(new Date(), 'yyyy-MM-dd')
      const now = new Date(nowFormatted)
      const dailyQuoteLastUpdate = new Date(lastUpdate)

      return isAfter(now, dailyQuoteLastUpdate)
    }

    if (updateBeforeToday(dailyQuote.updatedAt)) {
      const response = await prisma.daily.update({
        where: { id: 1 },
        data: {
          content: random.content,
          updatedAt: Date()
        }
      })

      res.json(response)
    }

    res.json(dailyQuote)
  }
}

export default handle
