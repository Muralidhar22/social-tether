import { AdvancedImage } from "@cloudinary/react"
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next'
import { useState } from "react";
import Image from "next/image";
import axios from "axios";

import getLayout from "@/layout";
import { authenticatedRoute } from '@/utils/redirection';
import { UserType } from '@/types';

export const getServerSideProps: GetServerSideProps<{userDetails: UserType}>  = authenticatedRoute

const Post = ({ userDetails }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [postText, setPostText] = useState<string>()
    const [image, setImage] = useState<File>()
    const [selectedImage, setSelectedImage] = useState<string>()
    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        // router
        const formData = new FormData()
        console.log(typeof image, image)
        formData.append("file", image)
        formData.append("upload_preset","hjgl49mu")
        console.log(formData, typeof formData)
        
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_API}`,formData)
        console.log(data)
    }
    
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        e.target.files && setImage(e.target.files[0])
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
                <div className="w-19 h-40 border border-dashed p-5">
                <label htmlFor="" id="post-picture">
                    Upload
                    <input type="file" accept="image/png, image/jpeg" onChange={(e) => onChangeHandler(e)} id="post-picture" />
                </label>
                    <Image 
                        src={selectedImage ?? ""}
                        alt={`uploaded image ${image?.name}`}
                        width={120}
                        height={120}
                    />
                </div>
                <textarea value={postText} onChange={(e) => setPostText(e.target.value)} name="" id="" cols={30} rows={10}>asdasd</textarea>
                <button type="submit" className="">submit</button>
            </form>
            </div>
            
        </>
    )
}

Post.getLayout = getLayout

export default Post