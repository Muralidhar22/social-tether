import { ReactElement, JSXElementConstructor } from 'react';
import Link from 'next/link';
import useSWR from "swr";
import Image from 'next/image';

import Logo from "@/components/Logo";
import DarkModeToggle from '@/components/DarkModeToggle';
import { getUserById, userIdEndpoint } from '@/lib/api/userApi';
import { UserType } from '@/types';
import UserImage from '@/components/UserImage';
import useSWRSessionState from '@/hooks/useSWRSessionState';
import NavMenu from '@/components/NavMenu';

import { FaCompass, FaBookmark, FaUser, FaSearch } from "react-icons/fa";

type Props = {
    children: React.ReactNode
    sessionUserId: string
}

const Layout = ({ children, sessionUserId }: Props) => {
    const cacheKey = `${userIdEndpoint}/${sessionUserId}`
    const [ { data: sessionUserData }, mutateSessionUser ] = useSWRSessionState(cacheKey,() => getUserById(sessionUserId))
    // const { data: userResponse } = useSWR(cacheKey,() => getUser(data?.user?.email ?? ""))

    return (
        <div className="p-5">
        <nav className="flex justify-between items-center">
        <Logo />
        <input type="search" className="dark:bg-black-500 border dark:border-zinc-500 border rounded-md focus:outline-none hidden lg:block" placeholder="search users"/>
        <span>
            <FaSearch className="lg:hidden" />
        </span>
            <div className="hidden lg:flex gap-5 item-center">
            <Link  href={`${sessionUserData ? `/${sessionUserData.username}` : "#"}`}>
            <UserImage 
                    imageSrc={sessionUserData?.image}
                />
            &nbsp;
            <span className="lg:hidden">
               Profile
            </span>  
            </Link>
           <Link href={`/bookmarks`}>
            <FaBookmark />
            &nbsp;
            <span className="lg:hidden">
                Bookmarks
            </span>
            </Link>
           <Link href={`/?feed=explore`}>
            <FaCompass />
            &nbsp;
            <span className="lg:hidden">
            Explore
            </span>
        </Link>
                <DarkModeToggle />
                <Link href="/new/post">New post</Link>

        </div>
        </nav>
            {children}
        </div>
    )
}

const getLayout = (page: ReactElement<any, string | JSXElementConstructor<any>>, sessionUserId: string) => {
    return (
      <Layout sessionUserId={sessionUserId}>
        {page}
      </Layout>
    )
}

export default getLayout;