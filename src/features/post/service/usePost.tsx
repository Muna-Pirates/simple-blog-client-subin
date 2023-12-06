import { useLazyQuery, useMutation } from "@apollo/client"
import { CREATE_POST, LIST_POST, VIEW_POST } from "../operations"

const usePost = () => {
	const [getPosts, postsResult] = useLazyQuery(LIST_POST)

	const [createPost, createPostResult] = useMutation(CREATE_POST)

	const [viewPost, viewPostResult] = useLazyQuery(VIEW_POST)

	return {
		getPosts,
		postsResult,
		createPost,
		createPostResult,
		viewPost,
		viewPostResult,
	}
}

export default usePost
