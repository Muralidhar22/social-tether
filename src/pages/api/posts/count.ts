import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  data?: any
}

export default async function postsCountHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query, method } = req
  const userId = query.userId as string

  switch (method) {
    case 'GET':
    const data = await prisma?.post.findMany({
        where: { 
            authorId: userId
        }
    })
    console.log("asdsad",{ data })
    return res.status(200).json({ message: "Posts count returned successfully!", data: { count: data?.length ?? 0 } })
    
    default:
      res.setHeader('Allow', ['GET'])
     return res.status(405).end(`Method ${method} Not Allowed`)
  }
}
