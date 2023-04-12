// likes mutation

import { GetLikesApiResponse } from "@/types/api"

export const addLikeOptions = () => {
    return {
        optimisticData: (currentData: GetLikesApiResponse | undefined) => {
            return {hasUserLiked: {id: "",value: true }, count: currentData ? currentData?.count + 1 : 0 }
        },
        rollbackOnError: true,
        populateCache: (likedId: string, currentData:  GetLikesApiResponse | undefined) => {
        return{hasUserLiked: {id: likedId,value: true }, count: currentData ? currentData.count + 1 : 0 }},
        revalidate: false,
    }
}

export const removeLikeOptions = () => {
    return {
        optimisticData: (currentData: GetLikesApiResponse | undefined) => {
            return {hasUserLiked: { id: "", value: false }, count: currentData ? currentData?.count - 1 : 0}},
        rollbackOnError: true,
        populateCache: (_removedId: string, currentData: GetLikesApiResponse | undefined) => ({hasUserLiked: { id: "", value: false }, count: currentData ? currentData?.count - 1 : 0}),
        revalidate: false,
    }
}