import { RouteObject } from "react-router-dom"
import Home from "@/features/post/pages/posts/Posts"
import Post from "@/features/post/pages/post/Post"
import WritePost from "@/features/post/pages/write/Write"
import WithAuth from "@/features/auth/components/with-auth/WithAuth"

const blogRoutes: RouteObject[] = [
	{
		index: true,
		Component: WithAuth(<Home />),
	},
	{
		path: "post/:id",
		Component: WithAuth(<Post />),
	},
	{
		path: "write",
		Component: WithAuth(<WritePost />, "user"),
	},
	{
		path: "write/:id",
		Component: WithAuth(<WritePost />, "user"),
	},
]

export default blogRoutes
