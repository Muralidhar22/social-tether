import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/client";

export default async function bookmarkHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req
//   const id = query.id
//   const name = query.name as string
  const bookmarkFilter = query.q as "all" | "post"
  const userId = query.userId as string
  const postId = query.postId as string
  
  switch (method) {
    case 'GET':
        if(bookmarkFilter === "post") {

            try {
              const data = await prisma?.bookmark?.findFirst({
                where: { userId, postId }
              })
                return res.status(200).json({ message: "Bookmark returned successfully!", data: { hasBookmarkedPost: !!data }})
                
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
            return res.status(200).json({ message: "Bookmarked posts returned successfully!", data: { hasBookmarkedPost: !!data }})
            
          } catch (error) {
            console.error(error)
            return res.status(500).json({message: "Something went wrong!", error})
          } finally {
            await prisma?.$disconnect()    
          }
        }
        return res.status(400).json({ message: "q param is missing/invalid" })
    case 'POST':
    
    case 'DELETE':
      
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}