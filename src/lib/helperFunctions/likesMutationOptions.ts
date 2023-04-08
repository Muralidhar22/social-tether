// likes mutation

export const addLikeOptions = () => {
    return {
        optimisticData: (currentData) => {
            console.log(currentData)
            return {hasUserLiked: {id: "",value: true }, count: currentData?.count + 1 }
        },
        rollbackOnError: true,
        populateCache: (likedId, currentData) => {
        return{hasUserLiked: {id: likedId,value: true }, count: currentData && currentData.count + 1 }},
        revalidate: false,
    }
}

export const removeLikeOptions = () => {
    return {
        optimisticData: (currentData) => {
            console.log({hasUserLiked: { id: "", value: false }, count: currentData?.count - 1})
            return {hasUserLiked: { id: "", value: false }, count: currentData &&  currentData?.count - 1}},
        rollbackOnError: true,
        populateCache: (_updatedData, currentData) => ({hasUserLiked: { id: "", value: false }, count: currentData && currentData?.count - 1}),
        revalidate: false,
    }
}