import { useLazyQuery, useMutation } from "@apollo/client"
import {
	ASSIGN_CATEGORY,
	CREATE_CATEGORY,
	CREATE_POST,
	DELETE_POST,
	FIND_CATEGORY,
	LIST_POST,
	SEARCH_POSTS,
	UPDATE_POST,
	VIEW_POST,
} from "../operations"

const usePost = () => {
	const [getPosts, postResult] = useLazyQuery(LIST_POST, {
		fetchPolicy: "cache-and-network",
		notifyOnNetworkStatusChange: true,
	})

	const [createPost, createPostResult] = useMutation(CREATE_POST)

	const [deletePost, deletePostResult] = useMutation(DELETE_POST)

	const [viewPost, viewPostResult] = useLazyQuery(VIEW_POST)

	const [updatePost, updatePostResult] = useMutation(UPDATE_POST)

	const [searchPosts, searchPostsResult] = useLazyQuery(SEARCH_POSTS, {
		fetchPolicy: "cache-and-network",
		notifyOnNetworkStatusChange: true,
	})

	const [createCategory, createCategoryResult] = useMutation(CREATE_CATEGORY)

	const [assignCategory, assignCategoryResult] = useMutation(ASSIGN_CATEGORY)

	const [findCategory, findCategoryResult] = useLazyQuery(FIND_CATEGORY)

	return {
		getPosts,
		postResult,
		createPost,
		createPostResult,
		deletePost,
		deletePostResult,
		viewPost,
		viewPostResult,
		updatePost,
		updatePostResult,
		searchPosts,
		searchPostsResult,
		createCategory,
		createCategoryResult,
		assignCategory,
		assignCategoryResult,
		findCategory,
		findCategoryResult,
	}
}

export default usePost
