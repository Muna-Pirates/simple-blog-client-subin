import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import RootLayout from "@/layout/root/Root"

const Root = () => {
	return (
		<RootLayout>
			<Outlet />
			<Toaster />
		</RootLayout>
	)
}

export default Root
