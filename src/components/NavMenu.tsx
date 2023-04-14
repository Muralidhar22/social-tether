import Link from "next/link";
import useSWR from "swr";

import { useSessionUser } from "@/context/SessionUser";
import { getUserById } from "@/lib/api/userApi";
import UserImage from "./UserImage";
import DarkModeToggle from "./DarkModeToggle";

import { FaCompass, FaBookmark } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

const NavMenu = ({className}: { className: string }) => {
    const { sessionUserId, sessionCacheKey } = useSessionUser() 
    const {data: sessionUserData, mutate: mutateSessionUser } = useSWR(sessionCacheKey, () => getUserById(sessionUserId))

    return(
        <div className={className}>
            <Link  href={`${sessionUserData ? `/${sessionUserData.username}` : "#"}`} >
                <UserImage 
                imageSrc={sessionUserData?.image}
                />
            </Link>
            <Link href={`/bookmarks`}>
                <FaBookmark />
            </Link>
           <Link href={`/?feed=explore`}>
                <FaCompass />
            </Link>
            <Link href={`/${sessionUserData?.username}?edit=true`}>
                <IoSettingsSharp />
            </Link>
            <DarkModeToggle />
        </div>
    )
}

export default NavMenu;