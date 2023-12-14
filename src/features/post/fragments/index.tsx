import { gql } from "@/lib/graphql"

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
