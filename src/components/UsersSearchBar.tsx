import { useState, useRef } from "react";
import Link from "next/link";

import useSWR from "swr";

import { getUserBySearchString, usersEndpoint } from "@/lib/api/userApi";
import UserImage from "./UserImage";

const UserSearchBar = () => {
    const [searchInputValue, setSearchInputValue] = useState<string>()
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>()
    const { data } = useSWR(debouncedSearchTerm ? usersEndpoint : null,() => getUserBySearchString(debouncedSearchTerm ?? ""))
    const timerRef = useRef<ReturnType<typeof setTimeout>>()

    const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(e.target.value)
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => setDebouncedSearchTerm(e.target.value.toLowerCase()),350)
    }

    return (
        <div className="relative">
        <input type="search" className={`dark:bg-black-500 border dark:border-zinc-500 border rounded-md focus:outline-none p-1`} placeholder="search users" value={searchInputValue} onChange={onSearchInputChange}/>

        {data && data.length > 0 && <div className="absolute translate-y-2 w-full dark:text-black bg-white p-2 flex flex-col">
            <ul>
               {
                data.map((el) => (
                    <li key={el.id}> <Link href={`/${el.username}`}><span className="flex items-center gap-1 dark:text-black">
                        <UserImage imageSrc={el.image} />
                        {el.username}</span></Link> </li>
                    ))
                }
                </ul>
                </div>}
        </div>
    )
}

export default UserSearchBar;