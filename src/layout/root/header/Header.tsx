import ViteLogo from "@/assets/vite.svg"
import { Button } from "@/components/ui/button"
import useAuth from "@/features/auth/service/useAuth"
import { Link, useNavigate } from "react-router-dom"
import User from "../user/User"

const Header = () => {
	const { isLogin } = useAuth()
	const navigate = useNavigate()

	const handleClickSignIn = () => {
		navigate("/login")
	}

	return (
		<header className="flex py-2 justify-between">
			<Link to="/">
				<div className="flex gap-2 items-center">
					<img src={ViteLogo} width={24} alt="vite logo" />
					<span className="font-mono font-bold text-lg">blog</span>
				</div>
			</Link>

			<div className="flex gap-4 items-center">
				{
					/**Login Button */
					!isLogin && (
						<Button className="bg-blue-800" onClick={handleClickSignIn}>
							Sign in
						</Button>
					)
				}
				{
					/**User Menu */
					isLogin && <User />
				}
			</div>
		</header>
	)
}

export default Header
