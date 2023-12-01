import Center from "@/layout/center/Center"
import LoginFom from "../../widgets/login-form/LoginFom"

const Register = () => {
	return (
		<Center>
			<h1 className="text-2xl font-bold mb-4">Register</h1>
			<div className="w-80">
				<LoginFom />
			</div>
		</Center>
	)
}

export default Register
