import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import prisma from "@/lib/client";

const selectOptions = {
  email: true,
  id: true,
  image: true,
  name: true,
  username: true,
  bio: true,
}

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req
  const username = query.username as string
  switch (method) {
    case 'GET':
      try {
        const user = await prisma?.user.findUnique({
          where: { username },
          select: selectOptions,
        })
        if(!user) {
          return res.status(404).json({ message: "User not found" })
        }
   
        return res.status(200).json({ message: "User returned successfully!", data: user})
      } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Something went wrong!", error})
      } finally {
        await prisma?.$disconnect()    
      }
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}