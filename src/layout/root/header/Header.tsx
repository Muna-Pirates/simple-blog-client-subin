import ViteLogo from "@/assets/vite.svg"
import { Button } from "@/components/ui/button"
import useAuth from "@/features/auth/service/useAuth"
import { Link, useNavigate } from "react-router-dom"
import User from "../user/User"
import { SearchOutlined } from "@ant-design/icons"
import ThemeMode from "../theme-mode/ThemeMode"

const Header = () => {
	const { isLogin } = useAuth()
	const navigate = useNavigate()

	const handleClickSignIn = () => {
		navigate("/login")
	}
	const handleClickSearch = () => {
		navigate("/search")
	}

	return (
		<header className="flex py-2 justify-between">
			<Link to="/">
				<div className="flex gap-2 items-center">
					<img src={ViteLogo} width={24} alt="vite logo" />
					<span className="font-mono font-bold text-lg">blog</span>
				</div>
			</Link>

			<div className="flex items-center">
				{
					/**Theme Toggle Button */
					<ThemeMode />
				}
				{/**Search Button */}
				<Button variant="ghost" size="icon" onClick={handleClickSearch}>
					<SearchOutlined style={{ fontSize: 25 }} />
				</Button>
				{
					/**Login Button */
					!isLogin && (
						<Button
							className=" bg-blue-600 dark:bg-white ml-2"
							onClick={handleClickSignIn}
						>
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
