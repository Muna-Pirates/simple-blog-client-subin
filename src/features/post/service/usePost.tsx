import { gql } from "@/lib/graphql/gql"
import { useLazyQuery, useMutation } from "@apollo/client"

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
            name
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
	const [createPost, createPostResult] = useMutation(CREATE_POST)
	/**CREATE_POST END */

	/**VIEW_POST START */
	const VIEW_POST = gql(`
	query ViewPost($id: Int!) {
		viewPost(id: $id) {
      id
      title
      content
      author {
        name
      }
      categories {
        name
      }
      createdAt
		}
	}
	`)
	const [viewPost, viewPostResult] = useLazyQuery(VIEW_POST)
	/**VIEW_POST END */

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
