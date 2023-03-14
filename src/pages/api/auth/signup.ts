import type { NextApiRequest, NextApiResponse } from 'next'
import { UserApiRequest } from '@/types/api'
import { hash } from 'bcryptjs'

type Data = {
  message: string
  data?: any
}

export default async function commentsHandler(
  req: UserApiRequest,
  res: NextApiResponse<Data>
) {
  const { query, method } = req
  const { email, password, username } = req.body

  switch (method) {
    case 'POST':
        if(!(email && password && username)) {
            return res.status(400).json({ message: "Fields are missing" })
        }
        
        const isExisting = await prisma?.user.findUnique({
            where: { username_email: { username, email } }
        }) 
        
      break;
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}