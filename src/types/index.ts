export type PostsFilterType = "all" | "following" | "user"

export type UserFollowType = {
    isFollowed: boolean;
    isFollowing: boolean;
    id?: string | null;
}

export type PostType = {
    id: string;
    content: string;
    authorId: string;
    image: string;
    updatedAt: any;
    createdAt: any;
    author: UserType;
    likes: LikesType[];
}

export type CommentType = {
    id: string;
    content: string;
    user: UserType;
    postId: string;
    createdAt: string;
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
}
