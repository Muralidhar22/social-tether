// likes mutation

export const addLikeOptions = () => {
    return {
        optimisticData: () => ({id: "",value: true }),
        rollbackOnError: true,
        populateCache: (likeId: string) => ({ id: likeId, value: true }),
        revalidate: false,
    }
}

export const removeLikeOptions = () => {
    return {
        optimisticData: () => ({id: "", value: false }),
        rollbackOnError: true,
        revalidate: false,
    }
}

export const decrementLikeCountOptions = () => {
    return {
        optimisticData: (currentCount: number) => {console.log({currentCount}, currentCount - 1); 
        return currentCount - 1},
        rollbackOnError: true,
        revalidate: false
    }
}

export const incrementLikeCountOptions = () => {
    return {
        optimisticData: (currentCount: number) => currentCount + 1,
        rollbackOnError: true,
        revalidate: false
    }
}