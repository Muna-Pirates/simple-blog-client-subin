import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import RootLayout from "@/layout/root/Root"
import { ErrorBoundary } from "react-error-boundary"

const Root = () => {
	return (
		<ErrorBoundary
			fallback={
				<div className="text-4xl text-center p-4">Something went wrong</div>
			}
		>
			<RootLayout>
				<Outlet />
				<Toaster />
			</RootLayout>
		</ErrorBoundary>
	)
}

export default Root
