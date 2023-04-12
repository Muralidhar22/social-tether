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
      userId: string
      cursor: string
      limit: string
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

export type GetLikesApiResponse = {
  count: number;
  hasUserLiked: {
    id: string;
    value: boolean;
  }
}