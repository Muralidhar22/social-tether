import { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req
  const email = query.email as string 
  const username = body.username as string
  console.log(req.body.username)
  switch (method) {
    case 'GET':
      // Get data from your database
      const user = await prisma?.user.findUnique({
        where: { email },
        select: {
          email: true,
          id: true,
          image: true,
          name: true,
          username: true
        }
      })
      if(!user) {
        return res.status(404).json({ message: "User not found" })
      }
      res.status(200).json(user)
      break;
    case 'PUT':
      if(username) {
        try{
          const updatedUser = await prisma?.user.update({
            where: { email },
            data: {
                username
            }
          })
          res.status(200).json(updatedUser)
        } catch (error) {
          if(error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
              res.status(400).json({ message: "username exists" })
            }
          }
        }

      }
      res.status(400)
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}