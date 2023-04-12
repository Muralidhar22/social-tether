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
  const searchString = query.search as string
  
  switch (method) {
    case 'GET':
      try{
        const user = await prisma?.user.findMany({
          where: { username: {
            startsWith: searchString
          } },
          select: selectOptions,
          take: 10
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
    case 'PUT':
        try{
          const updatedUser = await prisma?.user.update({
            where: { id: body.id },
            data: {
                image: body.image,
                bio: body.bio
            },
            select: selectOptions,
          })
          res.status(200).json(updatedUser)
        } catch (error) {
          if(error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
              res.status(400).json({ message: "username exists" })
            }
          } else {
            console.error(error)
            return res.status(500).json({message: "Something went wrong!", error})
          }
        } finally {
          await prisma?.$disconnect()    
        }
      res.status(400).json({ message: "Updated user details missing in payload" })
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}