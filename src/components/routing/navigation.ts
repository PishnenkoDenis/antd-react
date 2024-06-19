import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../Layout";
import { Login } from "../Login/Login";
import { Todo } from "../Todo/Todo";
import { Posts } from "../Posts/Posts";
import { PostCard } from "../Posts/PostCard";
import { PostsMain } from "../Posts/PostsMain";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Login,
      },
      {
        path: "todos",
        Component: Todo,
      },
      {
        path: "posts",
        Component: PostsMain,
        children: [
          {
            index: true,
            Component: Posts,
          },
          {
            path: ":id",
            Component: PostCard,
          },
        ],
      },
    ],
  },
]);
