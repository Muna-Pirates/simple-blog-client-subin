import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import {
	ASSIGN_CATEGORY,
	CREATE_CATEGORY,
	CREATE_POST,
	DELETE_POST,
	LIST_POST,
	UPDATE_POST,
	VIEW_POST,
} from "../operations"

const usePost = () => {
	const postResults = useQuery(LIST_POST, {
		variables: {
			pagination: {
				page: 1,
				pageSize: 20,
			},
		},
		fetchPolicy: "cache-and-network",
		notifyOnNetworkStatusChange: true,
	})

	const [createPost, createPostResult] = useMutation(CREATE_POST)

	const [deletePost, deletePostResult] = useMutation(DELETE_POST)

	const [viewPost, viewPostResult] = useLazyQuery(VIEW_POST)

	const [updatePost, updatePostResult] = useMutation(UPDATE_POST)

	const [createCategory, createCategoryResult] = useMutation(CREATE_CATEGORY)

	const [assignCategory, assignCategoryResult] = useMutation(ASSIGN_CATEGORY)

	return {
		postResults,
		createPost,
		createPostResult,
		deletePost,
		deletePostResult,
		viewPost,
		viewPostResult,
		updatePost,
		updatePostResult,
		createCategory,
		createCategoryResult,
		assignCategory,
		assignCategoryResult,
	}
}

export default usePost
