import { gql } from "@/lib/graphql/gql"
import { useMutation, useQuery } from "@apollo/client"

const useUser = () => {
	/**USER_PROFILE START */
	const USER_PROFILE = gql(`
	query ViewUserProfile {
		viewUserProfile {
			id
			email
			name
			roleId
		}
	}
	`)
	const { data: userProfile, ...rest } = useQuery(USER_PROFILE)
	const userProfileResult = { ...rest }
	/**USER_PROFILE END */

	/**UPDATE START */
	const UPDATE_USER = gql(`
    mutation UpdateUserProfile($updateData: UpdateUserInput!) {
      updateUserProfile(updateData: $updateData) {
        id
        email
        name
        roleId
      }
    }
  `)
	const [updateUserProfile, updateUserProfileResult] = useMutation(
		UPDATE_USER,
		{
			refetchQueries: [USER_PROFILE],
		}
	)
	/**UPDATE END */

	/**DELETE START */
	const DELETE_USER = gql(`
	  mutation DeleteUser($id: Int!) {
	    deleteUser(id: $id) {
				email
	    }
	  }
	`)
	const [deleteAccount, deleteAccountResult] = useMutation(DELETE_USER)
	/**DELETE END */

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
