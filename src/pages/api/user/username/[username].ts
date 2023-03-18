import { UserApiRequest } from '@/types/api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

const selectOptions = {
  email: true,
  id: true,
  image: true,
  name: true,
  username: true,
}

export default async function userHandler(
  req: UserApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req
  const username = query.username
  switch (method) {
    case 'GET':
      const user = await prisma?.user.findUnique({
        where: { username },
        select: selectOptions,
      })
      if(!user) {
        return res.status(404).json({ message: "User not found" })
      }
 
      return res.status(200).json({ message: "User returned successfully!", data: user})
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}