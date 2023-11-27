import { Button } from "@/components/ui/button"
import { gql } from "./lib/graphql/gql"
import { useQuery } from "@apollo/client"

const GET_USER = gql(`
query ViewUserProfile {
  viewUserProfile {
    id
    email
  }
}
`)

function App() {
	const { data } = useQuery(GET_USER)
	console.log(data?.viewUserProfile?.id)

	return (
		<div>
			<Button>Click!</Button>
		</div>
	)
}

export default App
