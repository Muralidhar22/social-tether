import { UserFollowType } from "@/types";
import { FollowApiResponse } from "@/types/api";
import tetherAxios from "./axiosInstance";


export const followCountEndpoint = "/api/follow/count";
export const followUserEndpoint = "/api/follow/user"

export const getUserFollowCount = async (userId: string | undefined) => {
    const { data: followCount } = await tetherAxios.get(followCountEndpoint, {
        params: { id: userId }
    })
    
    return followCount.data;
} 

export const getSessionUserFollowInfo = async (followerId: string | undefined, followingId: string | undefined): Promise<UserFollowType> => {
    const { data: followResponse } = await tetherAxios.get(followUserEndpoint, {
        params: { followerId, followingId }
    })
    return followResponse.data;
}

export const addFollow = async (followerId: string | undefined, followingId: string | undefined, previousData: UserFollowType): Promise<UserFollowType | undefined> => {
    if(followerId && followingId) {
        const { data: addResponse } = await tetherAxios.put(followUserEndpoint, {
           followerId,
           followingId
        }, { params: { q: "add" } })
        
        return { id: addResponse.id, isFollowing: true, isFollowed: previousData.isFollowed };   
    }
}

export const removeFollow = async (userFollowId: string): Promise<UserFollowType> => {
    const { data: removeResponse } = await tetherAxios.put(followUserEndpoint, {
        userFollowId
    }, { params: { q: "remove" } })
    return removeResponse.id;
} 
