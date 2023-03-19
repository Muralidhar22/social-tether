import type { NextApiRequest, NextApiResponse } from 'next'
import { UserApiRequest } from '@/types/api'
import { hash } from 'bcryptjs'

type Data = {
  message: string;
  data?: any;
  error?: any;
}

export default async function commentsHandler(
  req: UserApiRequest,
  res: NextApiResponse<Data>
) {
  const { query, method } = req
  const { email, password, username } = req.body

  switch (method) {
    case 'POST':
        if(!(email && password && username)) {
            return res.status(400).json({ message: "Fields are missing" })
        }
        try{
            const isUsernameEmailExisting = await prisma?.user.findUnique({
                where: { username_email: { username, email } }
            })
            if(isUsernameEmailExisting) {
                return res.status(422).json({ message: "User already exists" })
            }
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: "Something went wrong!", error})
        } finally {
           await prisma?.$disconnect()    
        }
        
        try {
            const data = await prisma?.user.create({
                data: {
                    username,
                    email,
                    password: await hash(password,12)
                }
            })
            return res.status(201).json({ message: "User created successfully", data })
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: "Something went wrong!", error})
        } finally {
           await prisma?.$disconnect()    
        }
    default:
      res.setHeader('Allow', ['POST'])
      return res.status(405).end(`Method ${method} not allowed`)
  }
}