import { gql } from "@/lib/graphql"

/** POST OPERATION */
export const LIST_POST = gql(`
	query ListPosts($pagination: PaginationInput!) {
		listPosts(pagination: $pagination) {
      pagination {
        page
        pageSize
        totalItems
      }
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

export const DELETE_POST = gql(`
  mutation DeletePost($postId: Int!) {
    deletePost(postId: $postId) {
      id
      title
      content
      authorId
      categoryId
      createdAt
      updatedAt
    }
  }
`)

export const VIEW_POST = gql(`
query ViewPost($id: Int!) {
  viewPost(id: $id) {
    ...PostItem
    category {
      ...CategoryItem
    }
    comments {
      ...CommentItem
    }
  }
}
`)

export const UPDATE_POST = gql(`
  mutation UpdatePost($postId: Int!, $updateData: UpdatePostInput!) {
    updatePost(postId: $postId, updateData: $updateData) {
      id
    }
  }
`)

export const SEARCH_POSTS = gql(`
query SearchPosts($searchCriteria: PostSearchInput!,$pagination:PaginationInput!) {
  searchPosts(searchCriteria: $searchCriteria, pagination:$pagination) {
    pagination {
        page
        pageSize
        totalItems
      }
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
        category {
          name
        }
        createdAt
      }
  }
}
`)

/** COMMENT OPERATION */
export const LIST_COMMENTS = gql(`
query ListComments($id: Int!) {
  viewPost(id: $id) {
    comments {
      ...CommentItem
    }
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

export const COMMENTS_SUBSCRIPTION = gql(`
  subscription OnCommentAdded($postId: Int!) {
    onCommentAdded(postId: $postId) {
      ...CommentItem
    }
  }
`)

/** CATEGORY OPERATION */
export const CREATE_CATEGORY = gql(`
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      id
    }
  }
`)

export const ASSIGN_CATEGORY = gql(`
  mutation AssignCategoryToPost($postId: Int!, $categoryId: Int!) {
    assignCategoryToPost(postId: $postId,categoryId: $categoryId) {
      id
    }
  }
`)

export const FIND_CATEGORY = gql(`
  query FindCategoryByName($name: String!) {
    findCategoryByName(name: $name) {      
      id
    }
  }
`)
