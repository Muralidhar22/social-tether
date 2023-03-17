import { useEffect, useState, useRef } from "react";
import useSWRInfinite from 'swr/infinite';
import useSWR from "swr";
import { useRouter } from "next/router";

import { getPosts,postsUrlEndpoint } from "@/lib/api/postApi";

type Props = {
    ComponentToRender: React.FC<any>
    cacheKey: any
    fetcher: () => any
}

const InfiniteScrollComponent = ({ fetcher, cacheKey, ComponentToRender }: Props) => {
    const [fetching, setFetching] = useState<boolean>(false)
    const loaderRef = useRef(null)
    const [loading, setLoading] = useState<boolean>(false)
    // const {  data, error, isLoading,setSize, size, mutate } = useSWRInfinite()
    const {  } = useSWR
    
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            const hasToLoadNewPosts = entries[0]
            if(!hasToLoadNewPosts.isIntersecting) return
            setFetching(true)
        }, { rootMargin: "100px" })
        if(loaderRef.current) {
            observer.observe(loaderRef.current)
        }
        
        return () => {
            observer.disconnect();
      };
    },[])

    return (
        <div>
            {[1, 2 , 3, 4, 5, 6].map((val) => (
                <ComponentToRender key={val} />
            ))}

            {loading && <div>loading...</div>}
            { fetching && <div>Fetching bruh....</div> }
            <div className="sr-only" ref={loaderRef}>load more</div>
        </div>
    )
}

export default InfiniteScrollComponent;