import { FollowApiResponse } from "@/types/api";
import tetherAxios from "./axiosInstance";


export const followEndpoint = "/api/follow";

export const getFollow = async (followerId: string, followingId: string): Promise<FollowApiResponse> => {
    const { data } = await tetherAxios.get(followEndpoint, {
        params: { followerId, followingId }
    })
    
    return data;
}

export const addFollow = async (followerId: string, followingId: string) => {
    const { data } = await tetherAxios.put(followEndpoint, {
       followerId,
       followingId
    }, { params: { q: "add" } })
    
    return data;
}

export const removeFollow = async (followerId: string, followingId: string) => {
    const { data } = await tetherAxios.put(followEndpoint, {
        followerId,
        followingId
    }, { params: { q: "remove" } })
    return data;
} 
