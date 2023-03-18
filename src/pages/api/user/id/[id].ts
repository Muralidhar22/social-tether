import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

export default async function userHandler(
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
            // Get data from your database
            let user;
            try {
              user = await prisma?.user.findUnique({
                where: { id },
                select: selectOptions,
              })
              
            } catch (error) {
              console.log("sadas",{error})
            }
            if(!user) {
              return res.status(404).json({ message: "User not found" })
            }
            return res.status(200).json({ message: "User returned successfully!", data: user})
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
                  }
                }
        
              }
        return res.status(400).json({ message: "New username cannot be empty" })
    default:
      res.setHeader('Allow', ['GET','PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}