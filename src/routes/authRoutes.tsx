import { RouteObject } from "react-router-dom"
import Login from "@/features/auth/pages/login/Login"
import Register from "@/features/auth/pages/register/Register"

const authRoutes: RouteObject[] = [
	{
		path: "login",
		element: <Login />,
	},
	{
		path: "register",
		element: <Register />,
	},
]

export default authRoutes
