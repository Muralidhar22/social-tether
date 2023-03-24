import { useEffect, useState, useRef } from "react";
import useSWRInfinite from 'swr/infinite';
import tetherAxios from "@/lib/api/axiosInstance";


type InfiniteScrollComponentProps = {
    ComponentToRender: React.FC<{ data: any, mutateData: any, page: number, index: number }>
    limit: number;
    url: string;
    keyOnData: "posts"
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

const InfiniteScrollComponent = ({ url, limit, keyOnData, ComponentToRender }: InfiniteScrollComponentProps) => {
    const { data, error, isLoading, setSize, size, mutate, isValidating } = useSWRInfinite(
        getKeyWithUrl(url, limit),fetcher   
        )
        const paginatedData = data && data?.map((val) => val[keyOnData ?? ""]) //leaving the cursor and picking up each page data
        const postsData = paginatedData && paginatedData ? [].concat(...paginatedData) : [];
        const observerRef = useRef<IntersectionObserver>()
        const loaderRef = useRef(null)
        const [loadNewPosts, setLoadNewPosts] = useState<boolean>()

        useEffect(() => {
            if(!isLoading && !isValidating && loadNewPosts) {
                const isUrlNull = data && getKeyWithUrl(url,limit)(size-1,data[size-1])
                if(isUrlNull) {
                    setSize(size + 1)
                } 
            }
        },[isLoading, isValidating, loadNewPosts, size, setSize, data])
        
    useEffect(() => {
        observerRef.current = new IntersectionObserver(entries => {
                const hasToLoadNewPosts = entries[0].isIntersecting
        //   check if elements is observable
            if(hasToLoadNewPosts){
                setLoadNewPosts(true)
            } else {
                setLoadNewPosts(false)
            }
            }, { rootMargin: "0px", root: null, threshold: 0 })
            if(loaderRef.current && observerRef.current) {
                observerRef.current.observe(loaderRef.current)
            }
        return () => {
          loaderRef.current && observerRef.current?.disconnect();
      };
    },[])

    if(error) {
        return(
            <>
                <div>Error....</div>
            </>
        )
    }
    return (
        <div>
            {
                postsData.map((data: any, idx) => (
                    <ComponentToRender key={data.id} data={data} mutateData={mutate} index={idx} page={Math.floor(idx/limit)} />
                ))
            }

            {(isLoading || isValidating) && <div>loading...</div>}
            <div className="sr-only" ref={loaderRef}>load more</div>
        </div>
    )
}

export default InfiniteScrollComponent;