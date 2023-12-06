import { gql } from "@/lib/graphql/gql"
import { useLazyQuery, useMutation } from "@apollo/client"

const useComment = () => {
	/**LIST_COMMENTS START */
	const LIST_COMMENTS = gql(`
	query ListComments($postId: Int!) {
		listComments(postId: $postId) {      
      id
      content
      author {
        id
        name
      }
      createdAt
		}
	}
	`)
	const [listComments, listCommentsResult] = useLazyQuery(LIST_COMMENTS)
	/**LIST_COMMENTS END */

	/**CREATE_COMMENT START */
	const CREATE_COMMENT = gql(`
    mutation AddComment($createCommentInput: CreateCommentInput!) {
      addComment(createCommentInput: $createCommentInput) {
        id
      }
    }
  `)
	const [createComment, createCommentResult] = useMutation(CREATE_COMMENT)
	/**CREATE_COMMENT END */

	/**UPDATE_COMMENT START */
	const UPDATE_COMMENT = gql(`
    mutation UpdateComment($updateCommentInput: UpdateCommentInput!) {
      updateComment(updateCommentInput: $updateCommentInput) {
        id
      }
    }
  `)
	const [updateComment, updateCommentResult] = useMutation(UPDATE_COMMENT)
	/**UPDATE_COMMENT END */

	/**DELETE_COMMENT START */
	const DELETE_COMMENT = gql(`
    mutation deleteComment($commentId: Int!) {
      deleteComment(commentId: $commentId) {
        id
      }
    }
  `)
	const [deleteComment, deleteCommentResult] = useMutation(DELETE_COMMENT)
	/**DELETE_COMMENT END */

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
