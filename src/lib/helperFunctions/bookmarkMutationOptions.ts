export const addBookmarkOptions = () => {
    return {
        optimisticData: () => {
            return {id: "",value: true }
        },
        rollbackOnError: true,
        populateCache: (bookmarkId: string) => {
        return {id: bookmarkId, value: true }},
        revalidate: false,
    }
}

export const removeBookmarkOptions = () => {
    return {
        optimisticData: () => {
            return {id: "",value: false }
        },
        rollbackOnError: true,
        populateCache: () => {
        return {id: "", value: false }},
        revalidate: false,
    }
}