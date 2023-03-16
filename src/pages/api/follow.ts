import type { NextApiResponse } from 'next'
import { FollowApiRequest, FollowApiResponse } from '@/types/api'

export default async function userHandler(
  req: FollowApiRequest,
  res: NextApiResponse<FollowApiResponse>
) {
  const { query, method, body } = req

  switch (method) {
    case 'GET':
      const isFollowingData = await prisma?.userFollow.findFirst({
        where: {
           followerId: query.followerId,
           followingId: query.followingId
        }
      })
      const isFollowerData = await prisma?.userFollow.findFirst({
        where: {
           followerId: query.followingId,
           followingId: query.followerId
        }
      })

      return res.status(200).json({ message: "Follows returned successfully!", data: { isFollowing: !!isFollowingData, isFollowed: !!isFollowerData } })
    case 'PUT':
      if(query.q === "add") {
          
          res.status(200).json({ message: "Follow updated successfully!" })
      } else if (query.q === "remove") {
        res.status(200).json({ message: "Follow updated successfully!" })
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}