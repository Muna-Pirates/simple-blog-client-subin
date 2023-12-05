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
	const [update, updateResult] = useMutation(UPDATE_USER, {
		refetchQueries: [USER_PROFILE],
	})
	/**UPDATE END */

	return { userProfile, userProfileResult, update, updateResult }
}

export default useUser
