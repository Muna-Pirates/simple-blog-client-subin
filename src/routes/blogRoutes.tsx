import { RouteObject } from "react-router-dom"
import Home from "@/pages/post/posts/Posts"
import Post from "@/pages/post/post/Post"

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
