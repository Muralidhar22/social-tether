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
import { useSessionUser, SessionUserContextType } from "@/context/SessionUser";

import { FaCompass, FaBookmark, FaUser, FaSearch } from "react-icons/fa";


const Layout = ({ children }: { children: React.ReactNode }) => {
    const { sessionUserId, sessionCacheKey } = useSessionUser() as SessionUserContextType
    const [ { data: sessionUserData }, mutateSessionUser ] = useSWRSessionState(sessionCacheKey,() => getUserById(sessionUserId))

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

const getLayout = (page: ReactElement<any, string | JSXElementConstructor<any>>) => {
    return (
      <Layout>
        {page}
      </Layout>
    )
}

export default getLayout;