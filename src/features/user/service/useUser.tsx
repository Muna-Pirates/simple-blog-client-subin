import { useMutation, useQuery } from "@apollo/client"
import { DELETE_USER, UPDATE_USER, USER_PROFILE } from "../operations"
import useAuth from "@/features/auth/service/useAuth"
import { useEffect } from "react"

const useUser = () => {
	const { isLogin, logout } = useAuth()

	const { data: profile, ...rest } = useQuery(USER_PROFILE, {
		skip: !isLogin,
	})

	const userProfileResult = { ...rest }

	const [updateUserProfile, updateUserProfileResult] = useMutation(UPDATE_USER)

	const [deleteAccount, deleteAccountResult] = useMutation(DELETE_USER)

	useEffect(() => {
		if (profile?.viewUserProfile === null) {
			logout()
		}
	}, [profile, logout])

	return {
		profile,
		userProfileResult,
		updateUserProfile,
		updateUserProfileResult,
		deleteAccount,
		deleteAccountResult,
	}
}

export default useUser
