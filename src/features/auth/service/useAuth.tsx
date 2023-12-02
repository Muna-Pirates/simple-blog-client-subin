import { gql } from "@/lib/graphql/gql"
import { makeVar, useMutation, useReactiveVar } from "@apollo/client"
import { TOKEN } from "../constants"
import sessionStorage from "@/lib/storage/session"

export const isLoginVar = makeVar(Boolean(sessionStorage.getItem(TOKEN)))

const useAuth = () => {
	const isLogin = useReactiveVar(isLoginVar)

	/**REGISTER START */
	const REGISTER_USER = gql(`
    mutation RegisterUser($createUserInput: CreateUserInput!) {
      registerUser(createUserInput: $createUserInput) {
        id
        email
        name
        roleId
      }
    }
  `)
	const [register, registerResult] = useMutation(REGISTER_USER)
	/**REGISTER END */

	/**LOGIN START */
	const LOGIN_USER = gql(`
	  mutation LoginUser($credentials: LoginInput!) {
	    loginUser(credentials: $credentials) {
        token
	    }
	  }
	`)
	const [login, loginResult] = useMutation(LOGIN_USER)
	/**LOGIN END */

	return { register, registerResult, login, loginResult, isLogin }
}

export default useAuth
