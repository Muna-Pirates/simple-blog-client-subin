import { makeVar, useMutation, useReactiveVar } from "@apollo/client"
import { TOKEN } from "../constants"
import sessionStorage from "@/lib/storage/session"
import { LOGIN_USER, REGISTER_USER } from "../operations"
import client from "@/lib/client/apollo"

export const isLoginVar = makeVar(Boolean(sessionStorage.getItem(TOKEN)))

const useAuth = () => {
	const isLogin = useReactiveVar(isLoginVar)

	const [register, registerResult] = useMutation(REGISTER_USER)

	const [login, loginResult] = useMutation(LOGIN_USER)

	const logout = () => {
		isLoginVar(false)
		sessionStorage.removeItem(TOKEN)

		client.clearStore().then(() => {
			window.location.reload()
		})
	}

	return { register, registerResult, login, loginResult, isLogin, logout }
}

export default useAuth
