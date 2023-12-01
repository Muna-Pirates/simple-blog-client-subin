import { Button } from "@/components/ui/button"
import Center from "@/layout/center/Center"
import { CheckCircleFilled } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

const RegisterComplete = () => {
	const navigate = useNavigate()
	const handleClickGoLogin = () => {
		navigate("/login")
	}
	return (
		<Center>
			<h1 className="text-3xl font-bold mb-8">REGISTRATION COMPLETED</h1>
			<CheckCircleFilled style={{ fontSize: 40, color: "green" }} />
			<Button className="mt-8 text-lg" onClick={handleClickGoLogin}>
				Continue
			</Button>
		</Center>
	)
}

export default RegisterComplete
