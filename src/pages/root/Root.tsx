import { Outlet } from "react-router-dom"

const RootLayout = () => {
	return (
		<div>
			Root
			<Outlet />
		</div>
	)
}

export default RootLayout
