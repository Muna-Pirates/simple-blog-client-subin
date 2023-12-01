interface IProps {
	children: React.ReactNode
}
const Center = ({ children, ...htmlAttributes }: IProps) => {
	return (
		<div
			className="flex justify-center items-center flex-col h-full"
			{...htmlAttributes}
		>
			{children}
		</div>
	)
}

export default Center
