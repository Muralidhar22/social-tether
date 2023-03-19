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
        if(pageIndex > 0 && !previousPageData.nextCursor)  return null
    
        const delimiter = url.includes('?') ? '&' : '?';
        if(pageIndex === 0) return `${url}${delimiter}limit=${limit}`
        
        console.log({previousPageData, pageIndex})
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
    const [intersecting, setIntersecting] = useState<boolean>()
    const loaderRef = useRef(null)
    const { data, error, isLoading, setSize, size, mutate, isValidating } = useSWRInfinite(
           getKeyWithUrl(url, limit),fetcher   
    )
    const paginatedData = data && data?.map((val) => val[keyOnData ?? ""]) //leaving the cursor and picking up each page data
    const postsData = paginatedData && paginatedData ? [].concat(...paginatedData) : [];
    let observer: IntersectionObserver;
    
    useEffect(() => {
        observer = new IntersectionObserver(entries => {
                const hasToLoadNewPosts = entries[0]
                if(!hasToLoadNewPosts.isIntersecting) return
                    console.log("SAdasdasdadsadsdasd")
          
            }, { rootMargin: "100px" })
            if(loaderRef.current) {
                observer.observe(loaderRef.current)
            }
        return () => {
           observer.disconnect();
      };
    },[])
    
    useEffect(() => {
        console.log("fetching")
    },[intersecting])
    
    console.log({size, data, keyOnData})

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

            {isLoading && <div>loading...</div>}
            <div className="sr-only" ref={loaderRef}>load more</div>
            <button onClick={() => setSize(size + 1)}>Load more</button>
        </div>
    )
}

export default InfiniteScrollComponent;