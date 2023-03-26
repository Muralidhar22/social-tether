import { memo } from "react";
import Image from "next/image";
import Link from "next/link";


import { FaRegUserCircle } from "react-icons/fa";

type UserImageProps = {
    imageSrc: string | undefined
    width?: number;
    height?: number;
}

const UserImage = memo(function UserImage({ imageSrc, width = 32, height = 32 }: UserImageProps) {
    
    console.log({imageSrc})
    
    return(
        <>
            <span className="block rounded-full grid place-content-center overflow-hidden w-8 h-8">            
                    {
                        imageSrc ?
                        <Image 
                        className="w-full h-full"
                        src={imageSrc}
                        alt="avatar"
                        width={width}
                        height={height}
                        /> :
                        <FaRegUserCircle />
                    }
            </span>
        </>
    )
})

export default UserImage;