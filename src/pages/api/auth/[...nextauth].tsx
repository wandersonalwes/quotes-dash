import { NextApiResponse } from 'next'
import NextAuth, { User } from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { NextApiRequest } from 'next-auth/_utils'
import prisma from '@/lib/prisma'
import { Session } from 'next-auth/client'

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],

  adapter: Adapters.Prisma.Adapter({
    prisma,
    modelMapping: {
      User: 'user',
      Account: 'account',
      Session: 'session',
      VerificationRequest: 'verificationRequest'
    }
  }),
  callbacks: {
    session: async (session: Session, user: User) => {
      session.user.id = user.id
      session.user.isAdmin = user.isAdmin
      return Promise.resolve(session)
    }
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)
