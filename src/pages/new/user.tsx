import { signOut } from "next-auth/react"
import { useState } from "react"
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { authenticatedRoute } from '@/utils/redirection';

export const getServerSideProps: GetServerSideProps = authenticatedRoute

const NewUser = ({ sessionUser }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [username, setUsername] = useState<string | null>(null)
    
    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        const email = sessionUser.email

        const res = await fetch(`http://localhost:3000/api/user/email/${email}`, { 
            method: "PUT",
            body: JSON.stringify({
                username,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const result = await res.json()
        console.log(result)
    }
    
    return (<>
        <div>
            Create a username to fill
            <form onSubmit={onSubmitHandler}>
                <input 
                    value={username ?? ""}
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                />   
            </form>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    </>)
}

export default NewUser;