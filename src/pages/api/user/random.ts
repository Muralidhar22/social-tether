import { UserApiRequest } from '@/types/api'
import type { NextApiResponse } from 'next'


export default async function userHandler(
  req: UserApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req
  const { username } = query

  switch (method) {
    case 'GET':
        let data;
        if(username) {
          data = await prisma?.user.findMany(
              {
                where: {
                  NOT: {
                    username
                  }
                },
                take: 4,
                   select: {
                      name: true,
                      image: true,
                      username: true,
                      email: true,
                      id: true
                  }
              }
          )
          res.status(200).json({ message: "Users returned successfully!", data })
        }
        res.status(400).json({message: "'username' param required"})
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}