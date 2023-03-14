import axios from "axios"

import { UserType } from "@/types"

export const usersEndpoint = "/api/user"
export const newUsersEndpoint = "/api/user/new"

export const getUser = async (type?: "new", email?: string) => {
    if(type === "new") {
        const { data: response, status } = await axios.get(`${newUsersEndpoint}/${email}`)
        return response;
    }
    const { data: response } = await axios.get(usersEndpoint)
    return response;
}

export const updateUser = async (updatedData: UserType ) => {
    
}

