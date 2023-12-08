import { GraphQLError } from "graphql";

export interface CustomGraphQLError extends GraphQLError {
  code: {
    error?: string
    message?: string | string[]
    statusCode?: number
  }
}
