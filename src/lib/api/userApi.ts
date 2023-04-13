import axios from "axios"
import tetherAxios from "./axiosInstance"

import { UserType } from "@/types"

type ResponseType<T> = {
    message: string,
    data: T
}

export const usersEndpoint = "/api/user"
export const randomUsersEndpoint = "/api/user/random"
export const userEmailEndpoint = "/api/user/email"
export const userIdEndpoint = "/api/user/id"
export const userUsernameEndpoint = "/api/user/username"

export const getUserBySearchString = async (searchString: string): Promise<UserType[]> => {
    const { data:response } = await tetherAxios.get(`${usersEndpoint}`,{
        params: { search: searchString }
    })
    
    return response.data
}

export const getUserByEmail = async (email: string): Promise<ResponseType<UserType> | undefined> => {
        if(email) {
            const { data, status } = await tetherAxios.get(`${userEmailEndpoint}/${email}`)
            return data;
        }
}

export const getUserById = async (id: string): Promise<UserType | undefined> => {
        if(id) {
            const { data: response, status } = await tetherAxios.get(`${userIdEndpoint}/${id}`)
            return response.data;
        }
}

export const getUserByUsername = async (username: string): Promise<UserType | undefined> => {
    if(username) {
        const { data: response, status } = await tetherAxios.get(`${userUsernameEndpoint}/${username}`)
        return response.data
    }
}

export const updateUsername = async (newUsername: string) => {
    const { data } = await tetherAxios.put(usersEndpoint,{ username: newUsername })
    return data
}

export const getRandomUsers = async (userId: string): Promise<ResponseType<UserType[]> | undefined> => {
        const { data } = await tetherAxios.get(randomUsersEndpoint, {
            params: {
                userId
            }
        })
        return data        
}

export const updateUserProfile = async (updatedUserDetails: UserType) => {
  const { data } = await tetherAxios.put(usersEndpoint, { ...updatedUserDetails })
  return data
}

