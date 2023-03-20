import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import prisma from "@/lib/client";

export default async function userIdHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req
  const id = query.id as string

  const selectOptions = {
    email: true,
    id: true,
    image: true,
    name: true,
    username: true,
  }
  
  switch (method) {
    case 'GET':
            try {
             const user = await prisma?.user.findUnique({
                where: { id },
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
      case 'PUT':
              if(body.username) {
                try{
                  const updatedUser = await prisma?.user.update({
                    where: { id },
                    data: {
                        username: body.username
                    }
                  })
                 return res.status(200).json({ message: "Username updated successfully!",data: updatedUser})
                } catch (error) {
                  if(error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                  return res.status(400).json({ message: "username exists" })
                    }
                  } else {
                    console.error(error)
                    return res.status(500).json({message: "Something went wrong!", error})
                  }
                } finally {
                 await prisma?.$disconnect()    
              }
              }
        return res.status(400).json({ message: "New username cannot be empty" })
    default:
      res.setHeader('Allow', ['GET','PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}