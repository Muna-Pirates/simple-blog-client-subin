import { RouteObject } from "react-router-dom"
import Profile from "@/pages/user/profile/Profile"

const userRoutes: RouteObject[] = [
	{
		path: "profile",
		element: <Profile />,
	},
]

export default userRoutes
