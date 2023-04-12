import axios from "axios"

export default async function uploadImgCloudinary(image: File) {
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset","hjgl49mu")
    try { 
        const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_API}`,formData)
        return data.secure_url
    } catch (error) {
        console.error(error)
    }
} 