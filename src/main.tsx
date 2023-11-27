import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { ApolloProvider } from "@apollo/client"
import ApolloClient from "./lib/client/apollo"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<ApolloProvider client={ApolloClient}>
		<App />
	</ApolloProvider>
)
