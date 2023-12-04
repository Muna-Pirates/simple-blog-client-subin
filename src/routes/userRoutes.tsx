import { RouteObject } from "react-router-dom"
import Profile from "@/features/user/pages/profile/Profile"

const userRoutes: RouteObject[] = [
	{
		path: "profile",
		element: <Profile />,
	},
]

export default userRoutes
