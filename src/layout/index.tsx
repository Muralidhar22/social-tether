import { ReactElement, JSXElementConstructor } from 'react';
import Link from 'next/link';
import useSWR from "swr";
import Image from 'next/image';

import Logo from "@/components/Logo";
import DarkModeToggle from '@/components/DarkModeToggle';
import { getUserById, userIdEndpoint } from '@/lib/api/userApi';
import { UserType } from '@/types';
import UserImage from '@/components/UserImage';
import NavMenu from '@/components/NavMenu';
import { useSessionUser, SessionUserContextType } from "@/context/SessionUser";

import { FaCompass, FaBookmark, FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import UserSearchBar from '@/components/UsersSearchBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { sessionUserId, sessionCacheKey } = useSessionUser() as SessionUserContextType
    const { data: sessionUserData ,mutate: mutateSessionUser } = useSWR(sessionCacheKey,() => getUserById(sessionUserId))

    return (
        <div className="p-5">
        <nav className="flex justify-between items-center">
        <Logo />
            <UserSearchBar />
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
        <Link href={`/${sessionUserData?.username}?edit=true`}>
           <IoSettingsSharp />
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