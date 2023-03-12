import InfiniteScrollComponent from "../InfiniteScroll";

const El = ({ className }: { className: string }) => (<div className={className}>OMG!</div>)

const Posts = () => {
    const url = new URL("http://localhost:3000")

    return (
        <InfiniteScrollComponent endpoint={url} ComponentToRender={El} />
    )
}

export default Posts;