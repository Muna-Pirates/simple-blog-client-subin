import { gql } from "@/lib/graphql"

/** POST OPERATION */
export const LIST_POST = gql(`
	query ListPosts($pagination: PaginationInput!) {
		listPosts(pagination: $pagination) {
      posts {
        id
        title
        content
        author {
          id 
          name
          email
        }
        comments {
          id
        }
        createdAt
      }
		}
	}
	`)

export const CREATE_POST = gql(`
mutation CreatePost($createPostInput: CreatePostInput!) {
  createPost(createPostInput: $createPostInput) {
    id
  }
}
`)

export const VIEW_POST = gql(`
query ViewPost($id: Int!) {
  viewPost(id: $id) {
    id
    title
    content
    author {
      id
      name
      email
    }
    categories {
      name
    }
    createdAt
  }
}
`)

/** COMMENT OPERATION */
export const LIST_COMMENTS = gql(`
query ListComments($postId: Int!) {
  listComments(postId: $postId) {      
    id
    content
    author {
      id
      name
      email
    }
    createdAt
  }
}
`)

export const CREATE_COMMENT = gql(`
mutation AddComment($createCommentInput: CreateCommentInput!) {
  addComment(createCommentInput: $createCommentInput) {
    id
  }
}
`)

export const UPDATE_COMMENT = gql(`
  mutation UpdateComment($updateCommentInput: UpdateCommentInput!) {
    updateComment(updateCommentInput: $updateCommentInput) {
      id
    }
  }
`)

export const DELETE_COMMENT = gql(`
mutation DeleteComment($commentId: Int!) {
  deleteComment(commentId: $commentId) {
    id
  }
}
`)
