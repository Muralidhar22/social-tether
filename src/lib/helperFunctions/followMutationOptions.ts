import { UserFollowType } from "@/types"

export const addFollowOptions = () => {
    return {
        optimisticData: (currentData: UserFollowType | undefined) => ({...currentData,isFollowed: currentData?.isFollowed ?? false,isFollowing: true }),
        rollbackOnError: true,
        populateCache: (newFollowId: string, currentData: UserFollowType | undefined) => ({ id: newFollowId, isFollowing: true, isFollowed: currentData?.isFollowed ?? false}),
        revalidate: false
    }
}

export const removeFollowOptions = () => {
    return {
        optimisticData: (userFollowData: UserFollowType) => ({...userFollowData, isFollowing: false }),
        rollbackOnError: true,
        populateCache: (_removedId: string, currentData: UserFollowType) => ({...currentData, id: null, isFollowing: false}),
        revalidate: false
    }
}