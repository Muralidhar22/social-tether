import type { NextApiResponse } from 'next'
import { FollowApiRequest } from '@/types/api'
import prisma from "@/lib/client";

export default async function userHandler(
  req: FollowApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req

  switch (method) {
    case 'GET':
      try{
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
      } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Something went wrong!", error})
      } finally {
       await prisma?.$disconnect()    
      }
    case 'PUT':
      if(query.q === "add") {
        try{
          const addData = await prisma?.userFollow.create({
            data: {
              followerId: body.followerId,
              followingId: body.followingId
            }
          })
        return  res.status(200).json({ message: "Follow updated successfully!", data: { id: addData?.id ?? null }})
        } catch (error) {
          console.error(error)
          return res.status(500).json({message: "Something went wrong!", error})
        } finally {
          await prisma?.$disconnect()    
        }
      } else if (query.q === "remove") {
        try{
          const removeData = await prisma?.userFollow.delete({
            where: {
              id: body.userFollowId
            }
          }) 
          return res.status(200).json({ message: "Follow updated successfully!", data: { id: removeData?.id } })
        } catch (error) {
          console.error(error)
          return res.status(500).json({message: "Something went wrong!", error})
        } finally {
          await prisma?.$disconnect()    
        }
      }
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}