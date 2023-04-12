import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/client";

export default async function getFollowInfoHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req
  const id = query.id as string

  switch (method) {
    case 'GET':
      try{
        const followingData = await prisma?.userFollow.count({
          where: {
              followerId: id
          }
        })
        const followerData = await prisma?.userFollow.count({
          where: {
              followingId: id
          }
        }) 
        return res.status(200).json({ message: "Follow info returned", data: {
          followingCount: followingData,
          followerCount: followerData
        } })
      } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Something went wrong!", error})
    } finally {
       await prisma?.$disconnect()    
    }
    default:
      res.setHeader('Allow', ['GET'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}