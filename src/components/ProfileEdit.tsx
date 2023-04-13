import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";

import { updateUserProfile } from "@/lib/api/userApi";

import uploadImgCloudinary from "@/utils/uploadImgCloudinary";
import UserImage from "./UserImage";
import { useSessionUser, SessionUserContextType } from "@/context/SessionUser";
import { getUserById } from "@/lib/api/userApi";

const ProfileEditPage = () => {
  const { sessionUserId, sessionCacheKey } = useSessionUser() 
  const {data: sessionUserData, mutate: mutateSessionUser } = useSWR(sessionCacheKey, () => getUserById(sessionUserId))
  const [formData, setFormData] = useState(sessionUserData)
  const [newImage, setNewImage] = useState<File | null>()
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [profileInfoChanged, setProfileInfoChanged] = useState<boolean>(false)
  
  useEffect(() => {
    if(JSON.stringify(sessionUserData) 
      !== 
      JSON.stringify(formData)) {
          setProfileInfoChanged(true)
      } else {
        setProfileInfoChanged(false)
      }
  },[formData])
  
  const onProfileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files && e.target.files[0];
  file && setNewImage(file)
    
  if (file) {
  const reader = new FileReader();
   reader.onloadend = async () => {
     setFormData(prev => (prev ? {...prev, image: reader.result as string} : prev))
   };
   reader.readAsDataURL(file);
   }
  };
        
    const editProfilePicture = () => {
         inputFileRef.current && inputFileRef.current.click()
    }
    
    const saveNewProfilePicture = async () => {
      let url = formData?.image;
      if(newImage) {
        url = await uploadImgCloudinary(newImage)
        // console.log(await updateUserProfile(url, sessionUserId))
        // setNewImage(null)
      }
      formData && await updateUserProfile({...formData, image: url})
    }
    
    return (
        <div className="w-3/4 mx-auto">
          <div className="flex gap-10 mb-5 items-center">
                <UserImage 
                    imageSrc={formData?.image}
                    height={120}
                    width={120}
                    displayBorder={true}
                />
                <button onClick={editProfilePicture}>upload</button>
                <input
                id="file-input"
                ref={inputFileRef}
                type="file"
                className="hidden"
                onChange={onProfileChangeHandler}
                />
          </div>
            <label htmlFor="username">
              Username:
            <input id="username" className="my-5 p-2 rounded-md block w-full cursor-not-allowed" disabled value={formData?.username} type="text" />
            </label>
            
            <label htmlFor="email">
              Email:
            <input id="email" className="block my-5 p-2 rounded-md w-full cursor-not-allowed" disabled value={formData?.email} type="text" />
            </label>
            
            <label htmlFor="bio">Bio:</label>
            <textarea name="bio" id="bio" rows={5} className="block p-2 rounded-md w-full" value={formData?.bio ??""} onChange={(e) => setFormData(prev => (prev ? {...prev, bio: e.target.value} : prev))}/>
            {profileInfoChanged && 
            <div className="inset-0 sticky flex gap-5 items-center mt-5">
              You may have unsaved changes
              <button onClick={saveNewProfilePicture} className="p-2 dark:bg-white dark:text-black bg-black rounded-md">save</button>
            </div>}
        </div>
    )
}

export default ProfileEditPage;