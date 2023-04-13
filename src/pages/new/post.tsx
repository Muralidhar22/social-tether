import { useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";

import { createPost } from "@/lib/api/postApi";
import getLayout from "@/layout";
import { authenticatedRoute } from '@/utils/redirection';
import { toastError } from "@/lib/toastMessage";
import { SessionUserContextType, useSessionUser } from "@/context/SessionUser";
import uploadImgCloudinary from "@/utils/uploadImgCloudinary";

export const getServerSideProps = authenticatedRoute

const Post = () => {
    const { sessionUserId } = useSessionUser() as SessionUserContextType
    const [postText, setPostText] = useState<string>()
    const [image, setImage] = useState<File | null>()
    const [selectedImage, setSelectedImage] = useState<string | null>()
    const inputFileRef = useRef<HTMLInputElement>(null)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    
    const onSubmitHandler = async (e: React.FormEvent) => { 
        e.preventDefault()
        // router
        setIsSubmitting(true)
        let imageCloudinaryUrl;
        if(!image && !postText) {
            toastError("Post content can't be empty")
            setIsSubmitting(false)
        }
        if(image) {
           imageCloudinaryUrl = await uploadImgCloudinary(image)
        } else if (postText || image) {
            await createPost( 
                sessionUserId,
                postText ?? "",
                imageCloudinaryUrl ?? "" 
            )
            setPostText("")
            setImage(null)
            setSelectedImage(null)
            if(inputFileRef.current) inputFileRef.current.value = ""
            setIsSubmitting(false)
        }
    }
    
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        file && setImage(file)
        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string)
            };
            reader.readAsDataURL(file)
        }
    }
    
    return (
        <>
            <div>
            <form onSubmit={onSubmitHandler} className="flex flex-col gap-3">
                <div className="w-19 border-4 border-dashed p-5">
                <label htmlFor="" id="post-picture">
                    select image&nbsp;
                    <input type="file" ref={inputFileRef} accept="image/png, image/jpeg" onChange={(e) => onChangeHandler(e)} id="post-picture" />
                </label>
                <div className="mt-2 flex justify-center">       
                    {selectedImage && 
                        <Image 
                            src={selectedImage ?? ""}
                            alt={`uploaded image ${image?.name}`}
                            width={120}
                            height={120}
                            className="object-contain block"
                        />
                    }
                </div>
                </div>
                <textarea value={postText} onChange={(e) => setPostText(e.target.value)} name="" id="" cols={30} rows={10} className="border-4 rounded-md"></textarea>
                <button type="submit" disabled={isSubmitting} className={`border-2 rounded-md mx-auto p-2 ${isSubmitting && "opacity-50"}`}>
                    {isSubmitting ? "creating post..." : "submit"}</button>
            </form>
            </div>
            
        </>
    )
}

Post.getLayout = getLayout

export default Post