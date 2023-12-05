import sessionStorage from "@/lib/storage/session"
import { TOKEN } from "../../constants"

type AccessType = "guest" | "user" | "anyone"

const WithAuth =
	(Component: React.ReactElement, access: AccessType = "anyone") =>
	() => {
		const hasAuthToken = Boolean(sessionStorage.getItem(TOKEN))
		if (access === "anyone") return Component
		if (access === "guest") {
			if (hasAuthToken) {
				location.replace("/")
			} else return Component
		}
		if (access === "user") {
			if (hasAuthToken) {
				return Component
			} else location.replace("/login")
		}
	}

export default WithAuth
