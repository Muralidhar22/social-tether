import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/client";

export default async function postByIdHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req
  const id = query.id as string
  const queryOptions: any = {
    select: {
      author:  {
        select: {
          name: true,
          image: true,
          id: true,
          username: true,
        }
      },
      authorId: true,
      id: true,
      image: true,
      likes: true,
      content: true,
      createdAt: true,
      updatedAt: true
    }
  };
  console.log({id})

  switch (method) {
    case 'GET':
      try {
        const data = await prisma?.post.findFirst({
            where: { 
                id
            },
            ...queryOptions
        })
        return res.status(200).json({ message: "Posts returned successfully!", data: data })
      }  catch (error) {
        console.error(error)
        return res.status(500).json({message: "Something went wrong!", error})
    } finally {
       await prisma?.$disconnect()    
    }
    case 'PUT':
      
      return res.json({ message: "Updated post successfully!" })
    default:
      res.setHeader('Allow', ['DELETE', 'PUT'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}
