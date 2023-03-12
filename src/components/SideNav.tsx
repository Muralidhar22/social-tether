import Link from "next/link";
// import { AdvancedImage } from "@cloudinary/react";
// import {  } from "@cloudinary/url-gen";

type SideNavPropsType = {
    username: string
}

const SideNav = ({ username }: SideNavPropsType) => {
    return(
        <>
        <aside>
           <Link href={`/profile/${username}`}>Profile</Link>
           <Link href={`/profile/${username}/bookmarks`}>Bookmarks</Link>
           <Link href={`/?feed=explore`}>Explore</Link>
        </aside>
        </>
    )
}

export default SideNav;