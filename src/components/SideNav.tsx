import Link from "next/link";
// import { AdvancedImage } from "@cloudinary/react";
// import {  } from "@cloudinary/url-gen";

type SideNavPropsType = {
    username: string
}

const SideNav = ({ username }: SideNavPropsType) => {
    return(
        <>
        <aside className="flex flex-col gap-5">
           <Link href={`/${username}`}>Profile</Link>
           <Link href={`/bookmarks`}>Bookmarks</Link>
           <Link href={`/?feed=explore`}>Explore</Link>
        </aside>
        </>
    )
}

export default SideNav;