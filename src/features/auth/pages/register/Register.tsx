import Center from "@/layout/center/Center"
import RegisterForm from "../../widgets/register-form/RegisterForm"

const Register = () => {
	return (
		<Center>
			<h1 className="text-2xl font-bold mb-4">Register</h1>
			<div className="w-80">
				<RegisterForm />
			</div>
		</Center>
	)
}

export default Register
