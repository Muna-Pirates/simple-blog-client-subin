import { gql } from "@/lib/graphql/gql"
import { useLazyQuery, useMutation, useQuery } from "@apollo/client"

const usePost = () => {
	/**LIST_POST START */
	const LIST_POST = gql(`
	query ListPosts($pagination: PaginationInput!) {
		listPosts(pagination: $pagination) {
      posts {
        id
        title
        content
        author {
          id
        }
        comments {
          id
        }
        createdAt
      }
		}
	}
	`)
	const [getPosts, postsResult] = useLazyQuery(LIST_POST)
	/**LIST_POST END */

	/**CREATE_POST START */
	const CREATE_POST = gql(`
    mutation CreatePost($createPostInput: CreatePostInput!) {
      createPost(createPostInput: $createPostInput) {
        id
      }
    }
  `)
	const [createPost, postResult] = useMutation(CREATE_POST)
	/**CREATE_POST END */

	return { getPosts, postsResult, createPost, postResult }
}

export default usePost
