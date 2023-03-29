import Link from "next/link";
// import { AdvancedImage } from "@cloudinary/react";
// import {  } from "@cloudinary/url-gen";
import { FaCompass, FaBookmark, FaUser, FaSearch } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
type SideNavPropsType = {
    username: string
}

const NavMenu = ({ username }: SideNavPropsType) => {
    return(
        <>
        <div className="flex gap-2">
           <Link href={`/${username}`}>
            <FaUser className="text-zinc-400"/>
         <IoSettings />
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
        </div>
        </>
    )
}

export default NavMenu;