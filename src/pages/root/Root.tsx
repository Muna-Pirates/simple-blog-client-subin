import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"

const Root = () => {
	return (
		<>
			<Outlet />
			<Toaster />
		</>
	)
}

export default Root
