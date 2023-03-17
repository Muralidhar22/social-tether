import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  data?: any
}

export default function commentsHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query, method } = req
//   const id = query.id
//   const name = query.name as string
  const postsFilter = query.q as "all" | "following"

  switch (method) {
    case 'GET':

    case 'PUT':

      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}