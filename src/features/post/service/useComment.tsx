import { useMutation } from "@apollo/client"
import { CREATE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT } from "../operations"

const useComment = () => {
	const [createComment, createCommentResult] = useMutation(CREATE_COMMENT)

	const [updateComment, updateCommentResult] = useMutation(UPDATE_COMMENT)

	const [deleteComment, deleteCommentResult] = useMutation(DELETE_COMMENT)

	return {
		createComment,
		createCommentResult,
		updateComment,
		updateCommentResult,
		deleteComment,
		deleteCommentResult,
	}
}

export default useComment
