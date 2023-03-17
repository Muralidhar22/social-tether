import type { NextApiRequest, NextApiResponse } from 'next'

import { PostsFilterType } from '.';

export type ResponseData = {
  data?: any;
  message: string;
  error?: any;
}

export interface PostsApiRequest extends NextApiRequest {
    body: {
      content: string
      authorId: string
      image?: string
      authorEmail: string
    };
    query: {
      q: PostsFilterType
      sid: string
    }
}

export interface UserApiRequest extends NextApiRequest {
    query: {
      id: string;
      email: string;
      username: string;
    };
    body: {
      username: string;
      email: string;
      password: string;
    }
}

export interface FollowApiRequest extends NextApiRequest {
  query: {
    q: "add" | "remove";
    followerId: string;
    followingId: string;
  };
  body: {
    followerId: string;
    followingId: string;
    userFollowId: string;
  }
}
export interface CommentsApiRequest extends NextApiRequest {
  
}

export interface LikesApiRequest extends NextApiRequest {
  
}

export type FollowApiResponse = {
  message: string
  data?: { isFollowed: boolean, isFollowing: boolean, id: string | null } | { id: string | null }
}