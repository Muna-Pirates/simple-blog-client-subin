import { useLazyQuery, useMutation } from "@apollo/client"
import {
	CREATE_COMMENT,
	DELETE_COMMENT,
	LIST_COMMENTS,
	UPDATE_COMMENT,
} from "../operations"

const useComment = () => {
	const [listComments, listCommentsResult] = useLazyQuery(LIST_COMMENTS)

	const [createComment, createCommentResult] = useMutation(CREATE_COMMENT)

	const [updateComment, updateCommentResult] = useMutation(UPDATE_COMMENT)

	const [deleteComment, deleteCommentResult] = useMutation(DELETE_COMMENT)

	return {
		listComments,
		listCommentsResult,
		createComment,
		createCommentResult,
		updateComment,
		updateCommentResult,
		deleteComment,
		deleteCommentResult,
	}
}

export default useComment
