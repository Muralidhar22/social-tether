import { UserFollowType } from "@/types";
import tetherAxios from "./axiosInstance";

export const followCountEndpoint = "api/follow/count";
export const followUserEndpoint = "api/follow/user"

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

export const addFollow = async (followerId: string, followingId: string, previousData: UserFollowType) => {
        const { data: addResponse } = await tetherAxios.post(followUserEndpoint, {
           followerId,
           followingId
        })
        
        return addResponse.data.addedItem;   
}

export const removeFollow = async (userFollowId: string) => {
        const { data: removeResponse } = await tetherAxios.delete(followUserEndpoint, {
         params:{ userFollowId }
        })
        return removeResponse.data.removedItem;
} 
