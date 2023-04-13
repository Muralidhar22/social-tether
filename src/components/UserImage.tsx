import { memo } from "react";
import Image from "next/image";

import { FaRegUserCircle } from "react-icons/fa";

type UserImageProps = {
    imageSrc: string | undefined
    width?: number;
    height?: number;
    displayBorder?: boolean; 
}

const UserImage = memo(function UserImage({ imageSrc, width = 32, height = 32, displayBorder }: UserImageProps) {
    
    return(
        <>
              <div className={`rounded-full overflow-hidden bg-black ${displayBorder && "border-2"}`} style={{ width: `${width}px`, height: `${height}px` }}>         
                    {
                        imageSrc ?
                        <Image
                            className="object-contain h-full"
                            src={imageSrc}
                            alt="avatar"
                            width={width}
                            height={height}
                        /> :
                        <FaRegUserCircle className="text-white w-full h-full" />
                    }
            </div>
        </>
    )
})

export default UserImage;