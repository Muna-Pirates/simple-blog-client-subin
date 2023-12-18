import { gql } from "@/lib/graphql"

export const PostFragment = gql(`
  fragment PostItem on Post {
    id
    title
    content
    author {
      id
      name
      email
    }
    createdAt
  }
`)

export const CategoryFragment = gql(`
  fragment CategoryItem on Category {
      id
      name
  }
`)

export const CommentFragment = gql(`
  fragment CommentItem on Comment {
    id
    content
    author {
      id
      name
      email
    }
    createdAt
  }
`)
