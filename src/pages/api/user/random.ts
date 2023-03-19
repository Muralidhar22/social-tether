import { UserApiRequest } from '@/types/api'
import type { NextApiResponse } from 'next'


export default async function userHandler(
  req: UserApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req
  const { username } = query

  switch (method) {
    case 'GET':
        
        if(username) {
          try{
              const data = await prisma?.user.findMany(
                  {
                    where: {
                      NOT: {
                        username
                      }
                    },
                    take: 4,
                        select: {
                          name: true,
                          image: true,
                          username: true,
                          email: true,
                          id: true
                      }
                  }
              )
              return res.status(200).json({ message: "Users returned successfully!", data })
            } catch (error) {
              console.error(error)
              return res.status(500).json({message: "Something went wrong!", error})
            } finally {
              await prisma?.$disconnect()    
            }
          }
          return res.status(400).json({message: "'username' param required"})
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}