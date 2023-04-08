import { signOut } from "next-auth/react"
import { useState } from "react"

import { updateUsername } from "@/lib/api/userApi";
import { authenticatedRoute } from '@/utils/redirection';
import { toastError } from "@/lib/toastMessage";

export const getServerSideProps = authenticatedRoute

const NewUser = () => {
    const [username, setUsername] = useState<string | null>(null)
    
    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        if(username) {
            try {
                const result = await updateUsername(username)
                
            } catch (error) {
                // toastError("")
            }
        }
    }
    
    return (<>
        <div>
            Create a username to fill
            <form onSubmit={onSubmitHandler}>
                <input 
                    required
                    value={username ?? ""}
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                />   
            </form>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    </>)
}

export default NewUser;