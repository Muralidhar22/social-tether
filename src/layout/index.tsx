import { ReactElement, JSXElementConstructor } from 'react';
import Link from 'next/link';
import useSWR from "swr";
import Image from 'next/image';

import Logo from "@/components/Logo";
import DarkModeToggle from '@/components/DarkModeToggle';
import { getUserByEmail, usersEndpoint } from '@/lib/api/userApi';
import { UserType } from '@/types';
import { useSession } from 'next-auth/react';
import UserImage from '@/components/UserImage';

import { FaRegUser } from "react-icons/fa";


type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    const cacheKey = usersEndpoint
    const { data: userResponse } = useSWR(cacheKey,() => getUser(data?.user?.email ?? ""))

    return (
        <div className="p-5">
        <nav className="flex justify-between items-center">
        <Logo />
        <input type="search" className="dark:bg-black-500 border dark:border-zinc-500 border rounded-md focus:outline-none" placeholder="search users"/>
            <div className="flex gap-5 item-center">
                <DarkModeToggle />
                <Link href="/new/post">New post</Link>
                <UserImage 
                    imageSrc={userResponse?.data?.image}
                />
            </div>
        </nav>
            {children}
        </div>
    )
}

const getLayout = (page: ReactElement<any, string | JSXElementConstructor<any>>) => {
    return (
      <Layout>
        {page}
      </Layout>
    )
}

export default getLayout;