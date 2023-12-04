import { gql } from "@/lib/graphql/gql"
import { useQuery } from "@apollo/client"

const GET_USER = gql(`
query ViewUserProfile {
  viewUserProfile {
    id
    email
  }
}
`)
const Profile = () => {
	const { data } = useQuery(GET_USER)

	if (!data?.viewUserProfile) return

	return <div>Profile : {data?.viewUserProfile?.id}</div>
}

export default Profile
