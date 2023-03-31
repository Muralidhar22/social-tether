import type { NextApiResponse, NextApiRequest } from 'next'
import prisma from "@/lib/client";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req

  switch (method) {
    case 'GET':
      try{
        const isFollowingData = await prisma?.userFollow.findFirst({
          where: {
             followerId: query.followerId as string,
             followingId: query.followingId as string
          }
        })
        const isFollowerData = await prisma?.userFollow.findFirst({
          where: {
             followerId: query.followingId as string,
             followingId: query.followerId as string
          }
        })
  
        return res.status(200).json({ message: "Follows returned successfully!", data: { isFollowing: !!isFollowingData, isFollowed: !!isFollowerData, id: isFollowingData?.id ?? null } })
      } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Something went wrong!", error})
      } finally {
       await prisma?.$disconnect()    
      }
    case 'POST':
        try{
          const addData = await prisma?.userFollow.create({
            data: {
              followerId: body.followerId,
              followingId: body.followingId
            }
          })
        return  res.status(200).json({ message: "Follow updated successfully!", data: { addedItem: addData?.id }})
        } catch (error) {
          console.error(error)
          return res.status(500).json({message: "Something went wrong!", error})
        } finally {
          await prisma?.$disconnect()    
        }
      case 'DELETE':
        try{
          const removeData = await prisma?.userFollow.delete({
            where: {
              id: query.userFollowId as string
            }
          }) 
          return res.status(200).json({ message: "Follow updated successfully!", data: { removedItem: removeData?.id } })
        } catch (error) {
          console.error(error)
          return res.status(500).json({message: "Something went wrong!", error})
        } finally {
          await prisma?.$disconnect()    
        }
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}