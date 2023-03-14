import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  data?: any
}

export default function postHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query, method } = req
  const id = query.id
  const name = query.name as string

  switch (method) {
    case 'DELETE':
      
      res.status(200).json({ message: "Deleted post successfully!" })
      break
    case 'PUT':
      
      res.json({ message: "Updated post successfully!" })
      break
    default:
      res.setHeader('Allow', ['DELETE', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
