import tetherAxios from "./axiosInstance"

import { UserType } from "@/types"

type ResponseType<T> = {
    message: string,
    data: T
}

export const usersEndpoint = "/api/user"
export const randomUsersEndpoint = "/api/user/random"
export const usernameEndpoint = "api/user/username"

export const getUser = async (email: string): Promise<ResponseType<UserType>> => {

        const { data: response, status } = await tetherAxios.get(usersEndpoint, { 
            params: {
                email
            }
        })
        return response;
}

export const updateUsername = async (newUsername: string) => {
    const { data } = await tetherAxios.put(usersEndpoint,{ username: newUsername })
    return data
}

export const getUserByUsername = async (username: string): Promise<ResponseType<UserType>> => {
    const { data } = await tetherAxios.get(`${usernameEndpoint}/${username}`)
    return data;
}

export const getRandomUsers = async (username: string): Promise<ResponseType<UserType[]>> => {
    const { data } = await tetherAxios.get(randomUsersEndpoint, {
        params: {
            username
        }
    })
    return data
} 

export const updateUser = async ( ) => {
    
}

