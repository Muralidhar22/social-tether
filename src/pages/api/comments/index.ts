import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/client";

export default async function userIdHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req
  const commentId = query.id as string
  
  switch (method) {
      case 'POST':
              if(body.postId && body.userId && body.content) {
                try{
                  const commentsData = await prisma?.comment.create({
                    data: {
                      content: body.content,
                      postId: body.postId,
                      userId: body.userId,
                    }
                  })
                    
                 return res.status(201).json({ message: "Item created successfully!",data: { createdItem: commentsData.id }})
                } catch (error) {
                    console.error(error)
                    return res.status(500).json({message: "Something went wrong!", error})
                } finally {
                 await prisma?.$disconnect()    
              }
              }
        return res.status(400).json({ message: "Payload has missing fields" })
        case 'DELETE':
            if(commentId) {
              try{
                const commentsData = await prisma?.comment.delete({
                  where: { id: commentId }
                })
               return res.status(200).json({ message: "Item removed successfully!",data: { removedItem: commentsData.id}})
              } catch (error) {
                  console.error(error)
                  return res.status(500).json({message: "Something went wrong!", error})
              } finally {
               await prisma?.$disconnect()    
            }
            }
      return res.status(400).json({ message: "comment id is missing" })
    default:
      res.setHeader('Allow', ['POST','DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}