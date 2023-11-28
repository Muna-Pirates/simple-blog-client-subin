import { RouteObject } from "react-router-dom"
import Login from "@/pages/auth/login/Login"
import Register from "@/pages/auth/register/Register"

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
