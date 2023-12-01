import { gql } from "@/lib/graphql/gql"
import { useMutation } from "@apollo/client"

const useAuth = () => {
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

	return { register, registerResult, login, loginResult }
}

export default useAuth
