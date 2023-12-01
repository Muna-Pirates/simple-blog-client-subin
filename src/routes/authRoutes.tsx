import { RouteObject } from "react-router-dom"
import Login from "@/features/auth/pages/login/Login"
import Register from "@/features/auth/pages/register/Register"
import RegisterComplete from "@/features/auth/pages/register-complete/RegisterComplete"

const authRoutes: RouteObject[] = [
	{
		path: "login",
		element: <Login />,
	},
	{
		path: "register",
		element: <Register />,
	},
	{
		path: "register-complete",
		element: <RegisterComplete />,
	},
]

export default authRoutes
