export type PostsFilterType = "all" | "following"

export type PostType = {
    id: string;
    content: string;
    authorId: string;
    image: string;
}

export type CommentType = {
    id: string;
    content: string;
    userId: string;
}

export type LikesType = {
    id: string;
    userId: string;
    postId: string;
}

export type UserType = {
    id: string;
    username: string;
    email: string;
    image?: string;
    name?: string;
    bio?: string;
    followers: UserType[];
    following: UserType[];
    posts: PostType[];
}
