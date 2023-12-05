import { RouteObject } from "react-router-dom"
import Login from "@/features/auth/pages/login/Login"
import Register from "@/features/auth/pages/register/Register"
import RegisterComplete from "@/features/auth/pages/register-complete/RegisterComplete"
import WithAuth from "@/features/auth/components/with-auth/WithAuth"

const authRoutes: RouteObject[] = [
	{
		path: "login",
		Component: WithAuth(<Login />, "guest"),
	},
	{
		path: "register",
		Component: WithAuth(<Register />, "guest"),
	},
	{
		path: "register-complete",
		Component: WithAuth(<RegisterComplete />, "guest"),
	},
]

export default authRoutes
