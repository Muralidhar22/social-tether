import { useEffect, useState, useRef } from "react";

type Props = {
    endpoint: URL
    ComponentToRender: React.FC<any>
}

const InfiniteScrollComponent = ({ endpoint, ComponentToRender }: Props) => {
    const [fetching, setFetching] = useState<boolean>(false)
    const loaderRef = useRef(null)
    const [loading, setLoading] = useState<boolean>(false)

    
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
            {[1, 2 , 3, 4, 5, 6].map((v) => (
                <ComponentToRender key={v} className="w-96 h-96 bg-rose-500 mb-4" />
            ))}

            {loading && <div>loading...</div>}
            { fetching && <div>Fetching bruh....</div> }
            <div className="sr-only" ref={loaderRef}>load more</div>
        </div>
    )
}

export default InfiniteScrollComponent;