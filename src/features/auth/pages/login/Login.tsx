import Center from "@/layout/center/Center"
import LoginForm from "../../widgets/login-form/LoginForm"

const Login = () => {
	return (
		<Center>
			<h1 className="text-4xl font-bold mb-8">Login</h1>
			<div className="w-80">
				<LoginForm />
			</div>
		</Center>
	)
}

export default Login
