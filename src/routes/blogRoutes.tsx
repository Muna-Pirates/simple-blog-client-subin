import { RouteObject } from "react-router-dom"
import Home from "@/features/post/pages/posts/Posts"
import Post from "@/features/post/pages/post/Post"

const blogRoutes: RouteObject[] = [
	{
		index: true,
		element: <Home />,
	},
	{
		path: "post/:id",
		element: <Post />,
	},
]

export default blogRoutes
