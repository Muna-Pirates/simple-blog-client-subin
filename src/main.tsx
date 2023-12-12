import ReactDOM from "react-dom/client"
import { ApolloProvider } from "@apollo/client"
import ApolloClient from "./lib/client/apollo"
import "./index.css"
import {
	RouteObject,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom"
import authRoutes from "./routes/authRoutes.tsx"
import blogRoutes from "./routes/blogRoutes.tsx"
import Root from "./pages/root/Root.tsx"
import userRoutes from "./routes/userRoutes.tsx"
import NotFound from "./pages/404/NotFound.tsx"

const notfoundRoutes: RouteObject[] = [{ path: "*", element: <NotFound /> }]

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [...authRoutes, ...blogRoutes, ...userRoutes, ...notfoundRoutes],
	},
])

ReactDOM.createRoot(document.getElementById("root")!).render(
	<ApolloProvider client={ApolloClient}>
		<RouterProvider router={router} />
	</ApolloProvider>
)
