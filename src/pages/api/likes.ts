import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/client";
type Data = {
  message: string
  data?: any
}

export default function likesHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query, method } = req
//   const id = query.id
//   const name = query.name as string
  const postsFilter = query.q as "all" | "following"

  switch (method) {
    case 'GET':
      // Get data from your database
      if(postsFilter === "all") {
          
          res.status(200).json({ message: "All posts returned successfully!"})
      } else if (postsFilter === "following") {
        res.status(200).json({message: "Following posts returned successfully!"})
      }
      break
    case 'PUT':
      // Update or create data in your database
    //   res.status(200).json({ id, name: name || `User ${id}` })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}