import type { NextApiRequest, NextApiResponse } from 'next'
import { hash } from "bcryptjs"

type ResponseData = {
    message: string
    error: { description: string }
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<Partial<ResponseData>>
) {
    if(req.method === "POST") {
        if(!req.body) res.status(400).json({ message: "Bad request", error: { description: "Fields cannot be blank" } })
        const { username, email, password } = req.body
        // check duplicate username and email
        // const checkExisting = await prisma?.user.findUnique({ where: 
        //     { email, username }})     
        // if(!checkexisting) return res.status(422).json({ message: "User already Exists" })
        // Users.create({ username })
        res.json({ message: "Registered successfully!" })
    } else {
        res.status(405).json({ message: "Bad request", error: { description: "HTTP POST request is only allowed" } })
    }
}