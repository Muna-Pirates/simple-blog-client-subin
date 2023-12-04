import Center from "../center/Center"
import Header from "./header/Header"

interface IProps {
	children: React.ReactNode
}

const Root = ({ children }: IProps) => {
	return (
		<div className="py-2 px-8 flex flex-nowrap flex-col h-full my-0 mx-auto">
			<Header />

			<Center>{children}</Center>
		</div>
	)
}

export default Root
