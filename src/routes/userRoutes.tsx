import { RouteObject } from "react-router-dom"
import Profile from "@/features/user/pages/profile/Profile"
import WithAuth from "@/features/auth/components/with-auth/WithAuth"

const userRoutes: RouteObject[] = [
	{
		path: "profile",
		Component: WithAuth(<Profile />, "user"),
	},
]

export default userRoutes
