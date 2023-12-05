/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation RegisterUser($createUserInput: CreateUserInput!) {\n      registerUser(createUserInput: $createUserInput) {\n        id\n        email\n        name\n        roleId\n      }\n    }\n  ": types.RegisterUserDocument,
    "\n\t  mutation LoginUser($credentials: LoginInput!) {\n\t    loginUser(credentials: $credentials) {\n        token\n\t    }\n\t  }\n\t": types.LoginUserDocument,
    "\n\tquery ViewUserProfile {\n\t\tviewUserProfile {\n\t\t\tid\n\t\t\temail\n\t\t\tname\n\t\t\troleId\n\t\t}\n\t}\n\t": types.ViewUserProfileDocument,
    "\n    mutation UpdateUserProfile($updateData: UpdateUserInput!) {\n      updateUserProfile(updateData: $updateData) {\n        id\n        email\n        name\n        roleId\n      }\n    }\n  ": types.UpdateUserProfileDocument,
    "\n\t  mutation DeleteUser($id: Int!) {\n\t    deleteUser(id: $id) {\n\t\t\t\temail\n\t    }\n\t  }\n\t": types.DeleteUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RegisterUser($createUserInput: CreateUserInput!) {\n      registerUser(createUserInput: $createUserInput) {\n        id\n        email\n        name\n        roleId\n      }\n    }\n  "): (typeof documents)["\n    mutation RegisterUser($createUserInput: CreateUserInput!) {\n      registerUser(createUserInput: $createUserInput) {\n        id\n        email\n        name\n        roleId\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t  mutation LoginUser($credentials: LoginInput!) {\n\t    loginUser(credentials: $credentials) {\n        token\n\t    }\n\t  }\n\t"): (typeof documents)["\n\t  mutation LoginUser($credentials: LoginInput!) {\n\t    loginUser(credentials: $credentials) {\n        token\n\t    }\n\t  }\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery ViewUserProfile {\n\t\tviewUserProfile {\n\t\t\tid\n\t\t\temail\n\t\t\tname\n\t\t\troleId\n\t\t}\n\t}\n\t"): (typeof documents)["\n\tquery ViewUserProfile {\n\t\tviewUserProfile {\n\t\t\tid\n\t\t\temail\n\t\t\tname\n\t\t\troleId\n\t\t}\n\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateUserProfile($updateData: UpdateUserInput!) {\n      updateUserProfile(updateData: $updateData) {\n        id\n        email\n        name\n        roleId\n      }\n    }\n  "): (typeof documents)["\n    mutation UpdateUserProfile($updateData: UpdateUserInput!) {\n      updateUserProfile(updateData: $updateData) {\n        id\n        email\n        name\n        roleId\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t  mutation DeleteUser($id: Int!) {\n\t    deleteUser(id: $id) {\n\t\t\t\temail\n\t    }\n\t  }\n\t"): (typeof documents)["\n\t  mutation DeleteUser($id: Int!) {\n\t    deleteUser(id: $id) {\n\t\t\t\temail\n\t    }\n\t  }\n\t"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;