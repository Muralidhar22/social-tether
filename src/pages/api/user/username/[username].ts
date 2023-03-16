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
      const data = await prisma?.user.findUnique({
        where: { username },
        select: {
            name: true,
            email: true,
            followers: true,
            following: true,
            posts: true,
            username: true, 
            image: true,
            id: true,
        }
      })
      // Get data from your database
      res.status(200).json({ message: "User returned successfully!", data })
      break;

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}