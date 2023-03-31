import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/client";

export default async function userIdHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req
  const likeId = query.likeId as string
  
  switch (method) {
      case 'POST':
              if(body.postId && body.userId) {
                try{
                  const likeData = await prisma?.like.create({
                    data: {
                      postId: body.postId,
                      userId: body.userId,
                    }
                  })
                    
                 return res.status(201).json({ message: "Item created successfully!",data: { addedItem: likeData.id }})
                } catch (error) {
                    console.error(error)
                    return res.status(500).json({message: "Something went wrong!", error})
                } finally {
                 await prisma?.$disconnect()    
              }
              }
        return res.status(400).json({ message: "UserId or PostId in payload is missing" })
        case 'DELETE':
            if(likeId) {
              try{
                const likeData = await prisma?.like.delete({
                  where: { id: likeId }
                })
               return res.status(200).json({ message: "Item removed successfully!",data: { removedItem: likeData.id}})
              } catch (error) {
                  console.error(error)
                  return res.status(500).json({message: "Something went wrong!", error})
              } finally {
               await prisma?.$disconnect()    
            }
            }
      return res.status(400).json({ message: "like id is missing" })
    default:
      res.setHeader('Allow', ['POST','DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}