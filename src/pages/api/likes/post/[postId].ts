import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import prisma from "@/lib/client";

export default async function userIdHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req
  const postId = query.postId as string
  const q = query.q as string
  const userId = query.userId as string
  switch (method) {
    case 'GET':
        try {
          const data = await prisma?.like.findFirst({
              where: { postId, userId },
            })
         const count = await prisma?.like.count({
              where: { postId },
          })
            
            return res.status(200).json({ message: "User returned successfully!", data: { hasUserLiked: {id: data?.id ?? "", value: !!data }, count }})
            
          } catch (error) {
            console.error(error)
            return res.status(500).json({message: "Something went wrong!", error})
          } finally {
            await prisma?.$disconnect()    
          }
    default:
      res.setHeader('Allow', ['GET','POST','DELETE'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}