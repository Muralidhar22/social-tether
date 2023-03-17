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

      return res.status(200).json({ message: "Follows returned successfully!", data: { isFollowing: !!isFollowingData, isFollowed: !!isFollowerData, id: isFollowingData?.id ?? null } })
    case 'PUT':
      if(query.q === "add") {
          const addData = await prisma?.userFollow.create({
            data: {
              followerId: body.followerId,
              followingId: body.followingId
            }
          })
        return  res.status(200).json({ message: "Follow updated successfully!", data: { id: addData?.id ?? null }})
      } else if (query.q === "remove") {
        const removeData = await prisma?.userFollow.delete({
          where: {
            id: body.userFollowId
          }
        }) 
        console.log({removeData})
        return res.status(200).json({ message: "Follow updated successfully!" })
      }
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}