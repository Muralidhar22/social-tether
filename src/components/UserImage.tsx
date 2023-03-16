import Image from "next/image";
import Link from "next/link";

import { FaRegUserCircle } from "react-icons/fa";

type UserImageProps = {
    imageSrc: string | undefined
    width?: number;
    height?: number;
}

const UserImage = ({ imageSrc, width = 32, height = 32 }: UserImageProps) => {
    return(
        <>
            <span className="block rounded-full grid place-content-center overflow-hidden">            
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
}

export default UserImage;