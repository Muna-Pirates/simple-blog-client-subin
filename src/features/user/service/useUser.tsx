import { useMutation, useQuery } from "@apollo/client"
import { DELETE_USER, UPDATE_USER, USER_PROFILE } from "../operations"

const useUser = () => {
	const { data: userProfile, ...rest } = useQuery(USER_PROFILE)
	const userProfileResult = { ...rest }

	const [updateUserProfile, updateUserProfileResult] = useMutation(UPDATE_USER)

	const [deleteAccount, deleteAccountResult] = useMutation(DELETE_USER)

	return {
		userProfile,
		userProfileResult,
		updateUserProfile,
		updateUserProfileResult,
		deleteAccount,
		deleteAccountResult,
	}
}

export default useUser
