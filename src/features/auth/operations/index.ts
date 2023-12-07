import { gql } from "@/lib/graphql"

export const REGISTER_USER = gql(`
mutation RegisterUser($createUserInput: CreateUserInput!) {
  registerUser(createUserInput: $createUserInput) {
    id
    email
    name
    role {
      id
    }
  }
}
`)

export const LOGIN_USER = gql(`
mutation LoginUser($credentials: LoginInput!) {
  loginUser(credentials: $credentials) {
    token
    user {
      id
      email
      name
      role {
        id
      }
    }
  }
}
`)