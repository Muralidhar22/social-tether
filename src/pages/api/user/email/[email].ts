import type { NextApiRequest, NextApiResponse } from 'next'


export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req
  const email = query.email as string
  console.log({ query })

  const selectOptions = {
    email: true,
    id: true,
    image: true,
    name: true,
    username: true,
    followers: true,
    following: true,
    posts: true
  }
  
  switch (method) {
    case 'GET':
            // Get data from your database
            let user;
            try {
              user = await prisma?.user.findUnique({
                where: { email },
                select: selectOptions,
              })
              
            } catch (error) {
              console.log("sadas",{error})
            }
            if(!user) {
              return res.status(404).json({ message: "User not found" })
            }
            res.status(200).json({ message: "User returned successfully!", data: user})
      break;
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}