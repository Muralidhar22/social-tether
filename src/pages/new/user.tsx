import { useRouter } from "next/router";
import { signOut } from "next-auth/react"
import { useState } from "react"

import { updateUsername } from "@/lib/api/userApi";
import { authenticatedRoute } from '@/utils/redirection';
import { toastError } from "@/lib/toastMessage";
import { useSessionUser } from "@/context/SessionUser";

export const getServerSideProps = authenticatedRoute

const NewUser = () => {
    const router = useRouter()
    const { sessionUserId } = useSessionUser()
    const [username, setUsername] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    
    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        if(username) {
            setIsSubmitting(true)
            try {
                await updateUsername(username, sessionUserId)
                process.env.NEXT_PUBLIC_BASE_URL && router.push(process.env.NEXT_PUBLIC_BASE_URL)
            } catch (error) {
                toastError("Something went wrong")
            } finally {
                setIsSubmitting(false)
            }
        }
    }
    
    return (<>
        <div className="w-4/5 mx-auto lg:w-1/2 md:w-3/4 mt-2">
            <div className="flex justify-between items-center">
            <span title="tether" className="font-bold text-5xl logo">t</span>
            <button onClick={() => signOut()} className="p-2 border-2 rounded-md cursor-pointer">Sign out</button>
            </div>
            <form onSubmit={onSubmitHandler} className="m-2">
               <label htmlFor="username">Enter a username</label>
                <input 
                    id="username"
                    required
                    value={username ?? ""}
                    type="text"
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                    className="border-2 p-1 w-full block mb-2 cursor-pointer"
                />
                <button className="p-2 border-2 rounded-md" disabled={isSubmitting}>{isSubmitting ? "Updating username..." : "Submit"}</button>
            </form>
        </div>
    </>)
}

export default NewUser;