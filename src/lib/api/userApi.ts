import tetherAxios from "./axiosInstance"

import { UserType } from "@/types"

export const usersEndpoint = "/api/user"
export const newUsersEndpoint = "/api/user/new"

export const getUser = async (type?: "new", email?: string): Promise<UserType> => {

    if(type === "new") {
        const { data: response, status } = await tetherAxios.get(`${newUsersEndpoint}/${email}`)
        return response;
    }
    const { data: response } = await tetherAxios.get(usersEndpoint)
    return response;
}

export const updateUser = async (updatedData: UserType ) => {
    
}

