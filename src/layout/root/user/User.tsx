import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TOKEN } from "@/features/auth/constants"
import { isLoginVar } from "@/features/auth/service/useAuth"
import { LogOut as LogOutIcon, User as UserIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

const User = () => {
	const navigate = useNavigate()
	const handleClickMenuProfile = () => {
		navigate("/profile")
	}
	const handleClickMenuLogout = () => {
		isLoginVar(false)
		sessionStorage.removeItem(TOKEN)

		navigate("/")
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button>
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>User</AvatarFallback>
					</Avatar>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={handleClickMenuProfile}>
					<UserIcon className="mr-2 h-4 w-4" />
					<span>Profile</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleClickMenuLogout}>
					<LogOutIcon className="mr-2 h-4 w-4" />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default User
