import Link from "next/link";
import { AdvancedImage } from "@cloudinary/react";
import {  } from "@cloudinary/url-gen";
const SideNav = () => {
    return(
        <>
        <aside>
           <Link href={`/profile/${}`}>Profile</Link>
           <Link href={`/profile/${}/bookmarks`}>Bookmarks</Link>
        </aside>
        </>
    )
}

export default SideNav;