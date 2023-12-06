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
    "\nmutation RegisterUser($createUserInput: CreateUserInput!) {\n  registerUser(createUserInput: $createUserInput) {\n    id\n    email\n    name\n    role {\n      id\n    }\n  }\n}\n": types.RegisterUserDocument,
    "\nmutation LoginUser($credentials: LoginInput!) {\n  loginUser(credentials: $credentials) {\n    token\n  }\n}\n": types.LoginUserDocument,
    "\n\tquery ListPosts($pagination: PaginationInput!) {\n\t\tlistPosts(pagination: $pagination) {\n      posts {\n        id\n        title\n        content\n        author {\n            name\n        }\n        comments {\n          id\n        }\n        createdAt\n      }\n\t\t}\n\t}\n\t": types.ListPostsDocument,
    "\nmutation CreatePost($createPostInput: CreatePostInput!) {\n  createPost(createPostInput: $createPostInput) {\n    id\n  }\n}\n": types.CreatePostDocument,
    "\nquery ViewPost($id: Int!) {\n  viewPost(id: $id) {\n    id\n    title\n    content\n    author {\n      name\n    }\n    categories {\n      name\n    }\n    createdAt\n  }\n}\n": types.ViewPostDocument,
    "\nquery ListComments($postId: Int!) {\n  listComments(postId: $postId) {      \n    id\n    content\n    author {\n      id\n      name\n    }\n    createdAt\n  }\n}\n": types.ListCommentsDocument,
    "\nmutation AddComment($createCommentInput: CreateCommentInput!) {\n  addComment(createCommentInput: $createCommentInput) {\n    id\n  }\n}\n": types.AddCommentDocument,
    "\n  mutation UpdateComment($updateCommentInput: UpdateCommentInput!) {\n    updateComment(updateCommentInput: $updateCommentInput) {\n      id\n    }\n  }\n": types.UpdateCommentDocument,
    "\nmutation DeleteComment($commentId: Int!) {\n  deleteComment(commentId: $commentId) {\n    id\n  }\n}\n": types.DeleteCommentDocument,
    "\nquery ViewUserProfile {\n  viewUserProfile {\n    id\n    email\n    name\n    role {\n      id\n    }\n  }\n}\n": types.ViewUserProfileDocument,
    "\nmutation UpdateUserProfile($updateData: UpdateUserInput!) {\n  updateUserProfile(updateData: $updateData) {\n    id\n    email\n    name\n    role {\n      id\n    }\n  }\n}\n": types.UpdateUserProfileDocument,
    "\nmutation DeleteUser($id: Int!) {\n  deleteUser(id: $id) {\n    email\n  }\n}\n": types.DeleteUserDocument,
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
export function gql(source: "\nmutation RegisterUser($createUserInput: CreateUserInput!) {\n  registerUser(createUserInput: $createUserInput) {\n    id\n    email\n    name\n    role {\n      id\n    }\n  }\n}\n"): (typeof documents)["\nmutation RegisterUser($createUserInput: CreateUserInput!) {\n  registerUser(createUserInput: $createUserInput) {\n    id\n    email\n    name\n    role {\n      id\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation LoginUser($credentials: LoginInput!) {\n  loginUser(credentials: $credentials) {\n    token\n  }\n}\n"): (typeof documents)["\nmutation LoginUser($credentials: LoginInput!) {\n  loginUser(credentials: $credentials) {\n    token\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery ListPosts($pagination: PaginationInput!) {\n\t\tlistPosts(pagination: $pagination) {\n      posts {\n        id\n        title\n        content\n        author {\n            name\n        }\n        comments {\n          id\n        }\n        createdAt\n      }\n\t\t}\n\t}\n\t"): (typeof documents)["\n\tquery ListPosts($pagination: PaginationInput!) {\n\t\tlistPosts(pagination: $pagination) {\n      posts {\n        id\n        title\n        content\n        author {\n            name\n        }\n        comments {\n          id\n        }\n        createdAt\n      }\n\t\t}\n\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreatePost($createPostInput: CreatePostInput!) {\n  createPost(createPostInput: $createPostInput) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation CreatePost($createPostInput: CreatePostInput!) {\n  createPost(createPostInput: $createPostInput) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery ViewPost($id: Int!) {\n  viewPost(id: $id) {\n    id\n    title\n    content\n    author {\n      name\n    }\n    categories {\n      name\n    }\n    createdAt\n  }\n}\n"): (typeof documents)["\nquery ViewPost($id: Int!) {\n  viewPost(id: $id) {\n    id\n    title\n    content\n    author {\n      name\n    }\n    categories {\n      name\n    }\n    createdAt\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery ListComments($postId: Int!) {\n  listComments(postId: $postId) {      \n    id\n    content\n    author {\n      id\n      name\n    }\n    createdAt\n  }\n}\n"): (typeof documents)["\nquery ListComments($postId: Int!) {\n  listComments(postId: $postId) {      \n    id\n    content\n    author {\n      id\n      name\n    }\n    createdAt\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation AddComment($createCommentInput: CreateCommentInput!) {\n  addComment(createCommentInput: $createCommentInput) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation AddComment($createCommentInput: CreateCommentInput!) {\n  addComment(createCommentInput: $createCommentInput) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateComment($updateCommentInput: UpdateCommentInput!) {\n    updateComment(updateCommentInput: $updateCommentInput) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateComment($updateCommentInput: UpdateCommentInput!) {\n    updateComment(updateCommentInput: $updateCommentInput) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteComment($commentId: Int!) {\n  deleteComment(commentId: $commentId) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation DeleteComment($commentId: Int!) {\n  deleteComment(commentId: $commentId) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery ViewUserProfile {\n  viewUserProfile {\n    id\n    email\n    name\n    role {\n      id\n    }\n  }\n}\n"): (typeof documents)["\nquery ViewUserProfile {\n  viewUserProfile {\n    id\n    email\n    name\n    role {\n      id\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateUserProfile($updateData: UpdateUserInput!) {\n  updateUserProfile(updateData: $updateData) {\n    id\n    email\n    name\n    role {\n      id\n    }\n  }\n}\n"): (typeof documents)["\nmutation UpdateUserProfile($updateData: UpdateUserInput!) {\n  updateUserProfile(updateData: $updateData) {\n    id\n    email\n    name\n    role {\n      id\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteUser($id: Int!) {\n  deleteUser(id: $id) {\n    email\n  }\n}\n"): (typeof documents)["\nmutation DeleteUser($id: Int!) {\n  deleteUser(id: $id) {\n    email\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;