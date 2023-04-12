import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/client";

export default async function bookmarkHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req
  const bookmarkFilter = query.q as "all" | "post"
  const userId = query.userId as string
  const postId = query.postId as string
  const bookmarkId = query.bookmarkId as string
  
  switch (method) {
    case 'GET':
        if(bookmarkFilter === "post") {

            try {
              const data = await prisma?.bookmark?.findFirst({
                where: { userId, postId }
              })
                return res.status(200).json({ message: "Bookmark returned successfully!", data: { id: data?.id ?? "" ,value: !!data }})
                
              } catch (error) {
                console.error(error)
                return res.status(500).json({message: "Something went wrong!", error})
              } finally {
                await prisma?.$disconnect()    
              }
        } else if(bookmarkFilter === "all") {
          try {
          const data = await prisma?.bookmark.findMany({
            select: {
              post: true
            }
          })
            return res.status(200).json({ message: "Bookmarked posts returned successfully!", data: data})
            
          } catch (error) {
            console.error(error)
            return res.status(500).json({message: "Something went wrong!", error})
          } finally {
            await prisma?.$disconnect()    
          }
        }
        return res.status(400).json({ message: "q param is missing/invalid" })
        case 'POST':
          if(body.postId && body.userId) {
            try{
              const bookmarkData = await prisma?.bookmark.create({
                data: {
                  postId: body.postId,
                  userId: body.userId,
                }
              })
                
             return res.status(201).json({ message: "Item created successfully!",data: { addedItem: bookmarkData.id }})
            } catch (error) {
                console.error(error)
                return res.status(500).json({message: "Something went wrong!", error})
            } finally {
             await prisma?.$disconnect()    
          }
          }
      return res.status(400).json({ message: "Payload has missing fields" })
    case 'DELETE':
        if(bookmarkId) {
          try{
            const bookmarkData = await prisma?.bookmark.delete({
              where: { id: bookmarkId }
            })
           return res.status(200).json({ message: "Item removed successfully!",data: { removedItem: bookmarkData.id}})
          } catch (error) {
              console.error(error)
              return res.status(500).json({message: "Something went wrong!", error})
          } finally {
           await prisma?.$disconnect()    
        }
        }
  return res.status(400).json({ message: "bookmarkId is missing" })
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}