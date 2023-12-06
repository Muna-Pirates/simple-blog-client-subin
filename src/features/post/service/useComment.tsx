import { gql } from "@/lib/graphql/gql"
import { useLazyQuery, useMutation, useQuery } from "@apollo/client"

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

	return {
		listComments,
		listCommentsResult,
		createComment,
		createCommentResult,
	}
}

export default useComment
