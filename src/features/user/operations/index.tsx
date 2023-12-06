import { gql } from "@/lib/graphql"

export const USER_PROFILE = gql(`
query ViewUserProfile {
  viewUserProfile {
    id
    email
    name
    role {
      id
    }
  }
}
`)

export const UPDATE_USER = gql(`
mutation UpdateUserProfile($updateData: UpdateUserInput!) {
  updateUserProfile(updateData: $updateData) {
    id
    email
    name
    role {
      id
    }
  }
}
`)

export const DELETE_USER = gql(`
mutation DeleteUser($id: Int!) {
  deleteUser(id: $id) {
    email
  }
}
`)
