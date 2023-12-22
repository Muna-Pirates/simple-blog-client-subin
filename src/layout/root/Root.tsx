import { AlertDialog } from "@/components/ui/alert-dialog"
import Center from "../center/Center"
import Header from "./header/Header"
import { ThemeProvider } from "@/components/ThemeProvider"

interface IProps {
	children: React.ReactNode
}

const Root = ({ children }: IProps) => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<AlertDialog>
				<div className="py-4 px-4 sm:px-8 flex flex-nowrap flex-col h-full my-0 mx-auto">
					<Header />
					<Center>{children}</Center>
				</div>
			</AlertDialog>
		</ThemeProvider>
	)
}

export default Root
