import { GraphQLError } from "graphql";

export interface CustomGraphQLError extends GraphQLError {
  error?: string
  statusCode?: number
}
