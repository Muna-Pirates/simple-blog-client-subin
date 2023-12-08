import { useLazyQuery, useMutation } from "@apollo/client"
import {
	ASSIGN_CATEGORY,
	CREATE_CATEGORY,
	CREATE_POST,
	DELETE_POST,
	LIST_POST,
	VIEW_POST,
} from "../operations"

const usePost = () => {
	const [getPosts, postsResult] = useLazyQuery(LIST_POST)

	const [createPost, createPostResult] = useMutation(CREATE_POST)

	const [deletePost, deletePostResult] = useMutation(DELETE_POST)

	const [viewPost, viewPostResult] = useLazyQuery(VIEW_POST)

	const [createCategory, createCategoryResult] = useMutation(CREATE_CATEGORY)

	const [assignCategory, assignCategoryResult] = useMutation(ASSIGN_CATEGORY)

	return {
		getPosts,
		postsResult,
		createPost,
		createPostResult,
		deletePost,
		deletePostResult,
		viewPost,
		viewPostResult,
		createCategory,
		createCategoryResult,
		assignCategory,
		assignCategoryResult,
	}
}

export default usePost
