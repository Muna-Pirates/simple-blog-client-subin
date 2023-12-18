import { cn } from "@/lib/utils"

interface IProps {
	children: React.ReactNode
	className?: string
}
const ErrorMessage = ({ children, className }: IProps) => {
	return <p className={cn("text-sm text-red-500", className)}>{children}</p>
}

export default ErrorMessage
