import { useEffect, useState, useRef } from "react";
import useSWRInfinite from 'swr/infinite';
import tetherAxios from "@/lib/api/axiosInstance";


type InfiniteScrollComponentProps<T> = {
    ComponentToRender: React.FC<{ data: T, mutateData?: any, page?: number, index?: number }>
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

const InfiniteScrollComponent = <T,>({ url, limit, keyOnData, ComponentToRender, emptyDataMessage }: InfiniteScrollComponentProps<T>) => {
    const { data, error, isLoading, setSize, size, mutate, isValidating } = useSWRInfinite(
        getKeyWithUrl(url, limit),fetcher, {
            revalidateOnFocus: false,
        }   
        )
        const paginatedData = data && data?.map((val) => val[keyOnData ?? ""]) //leaving the cursor and picking up each page data
        const mappedData = paginatedData && paginatedData ? [].concat(...paginatedData) : [];
        const loaderRef = useRef<HTMLDivElement>(null)
        const [loadNewPosts, setLoadNewPosts] = useState<boolean>()
        
        const handleClick = () => {
            const isUrlNull = data && getKeyWithUrl(url,limit)(size-1,data[size-1])
                if(isUrlNull) {
                    setSize(size + 1)
                } 
        }
        
        useEffect(() => {
            if(!isLoading && !isValidating && loadNewPosts) {
                const isUrlNull = data && getKeyWithUrl(url,limit)(size-1,data[size-1])
                if(isUrlNull) {
                    setSize(size + 1)
                } 
            }
        },[isLoading, isValidating, loadNewPosts])
    
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
    
    if(mappedData.length === 0) {
        return(
            <>
                <div>{emptyDataMessage}</div>
            </>
        )
    }
    
    return (

        <div>
            {
                mappedData.map((data: any, idx) => (
                    <ComponentToRender key={data.id} data={data} />
                ))
            }

            {(isLoading || isValidating) && <div>loading...</div>}
            <div className="sr-only" ref={loaderRef}>load more</div>
            {/* <button onClick={handleClick}>more</button> */}
        </div>
    )
}

export default InfiniteScrollComponent;