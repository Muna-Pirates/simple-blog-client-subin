import { AlertDialog } from "@/components/ui/alert-dialog"
import Center from "../center/Center"
import Header from "./header/Header"

interface IProps {
	children: React.ReactNode
}

const Root = ({ children }: IProps) => {
	return (
		<AlertDialog>
			<div className="py-4 px-4 sm:px-8 flex flex-nowrap flex-col h-full my-0 mx-auto">
				<Header />
				<Center>{children}</Center>
			</div>
		</AlertDialog>
	)
}

export default Root
