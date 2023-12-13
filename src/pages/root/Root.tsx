import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import RootLayout from "@/layout/root/Root"
import { ErrorBoundary } from "react-error-boundary"
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev"

const Root = () => {
	if (import.meta.env.DEV) {
		loadDevMessages()
		loadErrorMessages()
	}

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
