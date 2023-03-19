import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  data?: any
  error?: any
}

export default async function postsCountHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query, method } = req
  const userId = query.userId as string

  switch (method) {
    case 'GET':
      try {
        const data = await prisma?.post.findMany({
            where: { 
                authorId: userId
            }
        })
        return res.status(200).json({ message: "Posts count returned successfully!", data: { count: data?.length ?? 0 }})
      }  catch (error) {
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
