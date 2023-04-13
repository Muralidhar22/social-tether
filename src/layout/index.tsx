import { ReactElement, JSXElementConstructor } from 'react';
import Link from 'next/link';
import useSWR from "swr";
import Image from 'next/image';

import Logo from "@/components/Logo";
import DarkModeToggle from '@/components/DarkModeToggle';
import { getUserById, userIdEndpoint } from '@/lib/api/userApi';
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
        <nav className="flex justify-between items-center mb-10">
        <Logo />
            <div className="relative left-0 right-0 mx-auto"><UserSearchBar /></div>
            <div className="hidden md:flex gap-5 items-center">
            <NavMenu className="hidden md:flex gap-5 items-center" />
            <Link href="/new/post" className="p-2 border-2 rounded-md">New post</Link>
        </div>
        </nav>
            {children}
        <div className="w-full h-10"></div>
        <div className="md:hidden dark:bg-black border-t bg-white fixed right-0 left-0 bottom-0">
          <NavMenu className="flex justify-around dark items-center p-2" />
        </div>
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