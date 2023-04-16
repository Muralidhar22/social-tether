import { useEffect, useState, useRef } from "react";
import useSWRInfinite from 'swr/infinite';
import tetherAxios from "@/lib/api/axiosInstance";


type InfiniteScrollComponentProps = {
    ComponentToRender: React.FC<{ data: any, mutateData?: any, page?: number, index?: number }>
    limit: number;
    url: string;
    keyOnData: "posts";
    emptyDataMessage: string;
}

const getKeyWithUrl = (url: string, limit: number) => {
    return (pageIndex: number, previousPageData: { data: any, nextCursor: string }) => {
        if(pageIndex > 0 && typeof previousPageData?.nextCursor === "undefined")  return null
    
        const delimiter = url.includes('?') ? '&' : '?';
        if(pageIndex === 0) return `${url}${delimiter}limit=${limit}`
        
        return `${url}${delimiter}limit=${limit}&cursor=${previousPageData.nextCursor}`
    }
}

const fetcher = async (url: string) => {
    try{
       const { data: response } = await tetherAxios.get(url);
       return response.data
    } catch(error) {
        console.error(error)
    }
} 

const InfiniteScrollComponent = ({ url, limit, keyOnData, ComponentToRender, emptyDataMessage }: InfiniteScrollComponentProps) => {
    const { data, error, isLoading, setSize, size, mutate, isValidating } = useSWRInfinite(
        getKeyWithUrl(url, limit),fetcher)
    const paginatedData = data && data.length > 0 && data?.map((val) => val && val[keyOnData ?? ""]) //leaving the cursor and picking up each page data
    const mappedData = paginatedData && paginatedData ? [].concat(...paginatedData) : [];
    const loaderRef = useRef<HTMLDivElement>(null)
    const [loadNewPosts, setLoadNewPosts] = useState<boolean>()
    
    // const handleClick = () => {
    //     const isUrlNull = data && getKeyWithUrl(url,limit)(size-1,data[size-1])
    //         if(isUrlNull) {
    //             setSize(size + 1)
    //         } 
    // }
        
    useEffect(() => {
            if(!isLoading && !isValidating && loadNewPosts) {
                const isUrlNull = data && getKeyWithUrl(url,limit)(size-1,data[size-1])
                if(isUrlNull) {
                    setSize(size + 1)
                } 
            }
    },[isLoading, isValidating, loadNewPosts, size, data])
    
    useEffect(() => {
        if (!loaderRef.current) return
        const observer = new IntersectionObserver(entries => {
        const hasToLoadNewPosts = entries[0].isIntersecting
        //   check if elements is observable
        setLoadNewPosts(hasToLoadNewPosts)
    })
    
        observer.observe(loaderRef.current)
        return () => {
            loaderRef.current && observer.unobserve(loaderRef?.current)
      };
    })
    
    if(error) {
        return(
            <>
                <div>Error....</div>
            </>
        )
    }
    
    if(isLoading) {
        return(
            <div className="text-3xl font-bold">Loading..</div>
        )
    }
    
    if(mappedData.length === 0 && (!isLoading || !isValidating)) {
        return(
            <>
                <div>{emptyDataMessage}</div>
            </>
        )
    }
    
    if(!data) {
        return(
            <div className="font-bold text-xl">Something went wrong!</div>
        )
    }

    return (
        <div>
            {
                mappedData.map((data: any, idx) => (
                   data && <ComponentToRender key={data?.id} data={data} />
                ))
            }

            {(isLoading || isValidating) && <div>loading...</div>}
            <div className="sr-only" ref={loaderRef}>load more</div>
            {/* <button onClick={handleClick}>more</button> */}
        </div>
    )
}

export default InfiniteScrollComponent;