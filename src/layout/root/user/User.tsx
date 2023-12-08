import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import useAuth from "@/features/auth/service/useAuth"
import useUser from "@/features/user/service/useUser"
import { LogOutIcon, UserIcon, PencilLineIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

const User = () => {
	const navigate = useNavigate()
	const { logout } = useAuth()
	const { profile } = useUser()
	const name = profile?.viewUserProfile?.name || "user"

	const handleClickMenuProfile = () => {
		navigate("/profile")
	}

	const handleClickMenuWritePost = () => {
		navigate("/write")
	}

	const handleClickMenuLogout = () => {
		logout()
		navigate("/")
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button>
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>{name}</AvatarFallback>
					</Avatar>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={handleClickMenuProfile}>
					<UserIcon className="mr-2 h-4 w-4" />
					<span>Profile</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleClickMenuWritePost}>
					<PencilLineIcon className="mr-2 h-4 w-4" />
					<span>Write Post</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleClickMenuLogout}>
					<LogOutIcon className="mr-2 h-4 w-4" />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default User
