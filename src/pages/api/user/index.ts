import { UserApiRequest } from '@/types/api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

const selectOptions = {
  email: true,
  id: true,
  image: true,
  name: true,
  username: true,
  followers: true,
  following: true,
  posts: true
}

export default async function userHandler(
  req: UserApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req
  
  switch (method) {
    case 'GET':
      // // Get data from your database
      // const user = await prisma?.user.findUnique({
      //   where: { email: query.email },
      //   select: selectOptions,
      // })
      // if(!user) {
      //   return res.status(404).json({ message: "User not found" })
      // }
      // res.status(200).json({ message: "User returned successfully!"})
      break;
    case 'PUT':
      if(body.username) {
        try{
          const updatedUser = await prisma?.user.update({
            where: { email: body.email },
            data: {
                username: body.username
            }
          })
          res.status(200).json(updatedUser)
        } catch (error) {
          if(error instanceof PrismaClientKnownRequestError) {
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