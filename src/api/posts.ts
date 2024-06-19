import axios, { AxiosResponse } from "axios";
import { TAddPost } from "../components/Posts/Posts";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = async () => await axios.get<IPost[]>(POSTS_URL);

export const addPost = async (post: TAddPost) => {
  try {
    const res = await axios.post<any, AxiosResponse, Omit<IPost, "id">>(
      POSTS_URL,
      {
        ...post,
        userId: 1,
      }
    );
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchPost = async (id: number) =>
  await axios.get<IPost>(`${POSTS_URL}/${id}`);
