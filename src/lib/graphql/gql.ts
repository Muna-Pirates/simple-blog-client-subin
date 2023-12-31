/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

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
  "\nmutation RegisterUser($createUserInput: CreateUserInput!) {\n  registerUser(createUserInput: $createUserInput) {\n    id\n    email\n    name\n    role {\n      id\n    }\n  }\n}\n":
    types.RegisterUserDocument,
  "\nmutation LoginUser($credentials: LoginInput!) {\n  loginUser(credentials: $credentials) {\n    token\n    user {\n      id\n      email\n      name\n      role {\n        id\n      }\n    }\n  }\n}\n":
    types.LoginUserDocument,
  "\n  fragment PostItem on Post {\n    id\n    title\n    content\n    author {\n      id\n      name\n      email\n    }\n    createdAt\n  }\n":
    types.PostItemFragmentDoc,
  "\n  fragment CategoryItem on Category {\n      id\n      name\n  }\n":
    types.CategoryItemFragmentDoc,
  "\n  fragment CommentItem on Comment {\n    id\n    content\n    author {\n      id\n      name\n      email\n    }\n    createdAt\n  }\n":
    types.CommentItemFragmentDoc,
  "\n\tquery ListPosts($pagination: PaginationInput!) {\n\t\tlistPosts(pagination: $pagination) {\n      pagination {\n        page\n        pageSize\n        totalItems\n      }\n      posts {\n        id\n        title\n        content\n        author {\n          id \n          name\n          email\n        }\n        comments {\n          id\n        }\n        createdAt\n      }\n\t\t}\n\t}\n\t":
    types.ListPostsDocument,
  "\n  mutation CreatePost($createPostInput: CreatePostInput!) {\n    createPost(createPostInput: $createPostInput) {\n      id\n    }\n  }\n":
    types.CreatePostDocument,
  "\n  mutation DeletePost($postId: Int!) {\n    deletePost(postId: $postId) {\n      ...PostItem\n    }\n  }\n":
    types.DeletePostDocument,
  "\nquery ViewPost($id: Int!) {\n  viewPost(id: $id) {\n    ...PostItem\n    category {\n      ...CategoryItem\n    }\n    comments {\n      ...CommentItem\n    }\n  }\n}\n":
    types.ViewPostDocument,
  "\n  mutation UpdatePost($postId: Int!, $updateData: UpdatePostInput!) {\n    updatePost(postId: $postId, updateData: $updateData) {\n      ...PostItem\n      category {\n        ...CategoryItem\n      }\n    }\n  }\n":
    types.UpdatePostDocument,
  "\nquery SearchPosts($searchCriteria: PostSearchInput!,$pagination:PaginationInput!) {\n  searchPosts(searchCriteria: $searchCriteria, pagination:$pagination) {\n    pagination {\n        page\n        pageSize\n        totalItems\n      }\n      posts {\n        id\n        title\n        content\n        author {\n          id \n          name\n          email\n        }\n        comments {\n          id\n        }\n        category {\n          name\n        }\n        createdAt\n      }\n  }\n}\n":
    types.SearchPostsDocument,
  "\n\tquery FilterPostsByCategory($categoryId: Int!) {\n\t\tfilterPostsByCategory(categoryId: $categoryId) {\n        id\n        title\n        content\n        author {\n          id \n          name\n          email\n        }\n        comments {\n          id\n        }\n        category {\n          name\n        }\n        createdAt\n\t\t}\n\t}\n":
    types.FilterPostsByCategoryDocument,
  "\n  mutation AddComment($createCommentInput: CreateCommentInput!) {\n    addComment(createCommentInput: $createCommentInput) {\n      ...CommentItem\n    }\n  }\n":
    types.AddCommentDocument,
  "\n  mutation UpdateComment($updateCommentInput: UpdateCommentInput!) {\n    updateComment(updateCommentInput: $updateCommentInput) {\n      ...CommentItem\n    }\n  }\n":
    types.UpdateCommentDocument,
  "\n  mutation DeleteComment($commentId: Int!) {\n    deleteComment(commentId: $commentId) {\n      id\n    }\n  }\n":
    types.DeleteCommentDocument,
  "\n  subscription OnCommentAdded($postId: Int!) {\n    onCommentAdded(postId: $postId) {\n      ...CommentItem\n    }\n  }\n":
    types.OnCommentAddedDocument,
  "\n  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      id\n    }\n  }\n":
    types.CreateCategoryDocument,
  "\n  mutation AssignCategoryToPost($postId: Int!, $categoryId: Int!) {\n    assignCategoryToPost(postId: $postId,categoryId: $categoryId) {\n      id\n      category {\n        ...CategoryItem\n      }\n    }\n  }\n":
    types.AssignCategoryToPostDocument,
  "\n  query FindCategoryByName($name: String!) {\n    findCategoryByName(name: $name) {     \n      id\n    }\n  }\n":
    types.FindCategoryByNameDocument,
  "\nquery ViewUserProfile {\n  viewUserProfile {\n    id\n    email\n    name\n    role {\n      id\n    }\n  }\n}\n":
    types.ViewUserProfileDocument,
  "\nmutation UpdateUserProfile($updateData: UpdateUserInput!) {\n  updateUserProfile(updateData: $updateData) {\n    id\n    email\n    name\n    role {\n      id\n    }\n  }\n}\n":
    types.UpdateUserProfileDocument,
  "\nmutation DeleteUser($id: Int!) {\n  deleteUser(id: $id) {\n    email\n  }\n}\n":
    types.DeleteUserDocument,
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
export function gql(
  source: "\nmutation RegisterUser($createUserInput: CreateUserInput!) {\n  registerUser(createUserInput: $createUserInput) {\n    id\n    email\n    name\n    role {\n      id\n    }\n  }\n}\n",
): (typeof documents)["\nmutation RegisterUser($createUserInput: CreateUserInput!) {\n  registerUser(createUserInput: $createUserInput) {\n    id\n    email\n    name\n    role {\n      id\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation LoginUser($credentials: LoginInput!) {\n  loginUser(credentials: $credentials) {\n    token\n    user {\n      id\n      email\n      name\n      role {\n        id\n      }\n    }\n  }\n}\n",
): (typeof documents)["\nmutation LoginUser($credentials: LoginInput!) {\n  loginUser(credentials: $credentials) {\n    token\n    user {\n      id\n      email\n      name\n      role {\n        id\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment PostItem on Post {\n    id\n    title\n    content\n    author {\n      id\n      name\n      email\n    }\n    createdAt\n  }\n",
): (typeof documents)["\n  fragment PostItem on Post {\n    id\n    title\n    content\n    author {\n      id\n      name\n      email\n    }\n    createdAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment CategoryItem on Category {\n      id\n      name\n  }\n",
): (typeof documents)["\n  fragment CategoryItem on Category {\n      id\n      name\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment CommentItem on Comment {\n    id\n    content\n    author {\n      id\n      name\n      email\n    }\n    createdAt\n  }\n",
): (typeof documents)["\n  fragment CommentItem on Comment {\n    id\n    content\n    author {\n      id\n      name\n      email\n    }\n    createdAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tquery ListPosts($pagination: PaginationInput!) {\n\t\tlistPosts(pagination: $pagination) {\n      pagination {\n        page\n        pageSize\n        totalItems\n      }\n      posts {\n        id\n        title\n        content\n        author {\n          id \n          name\n          email\n        }\n        comments {\n          id\n        }\n        createdAt\n      }\n\t\t}\n\t}\n\t",
): (typeof documents)["\n\tquery ListPosts($pagination: PaginationInput!) {\n\t\tlistPosts(pagination: $pagination) {\n      pagination {\n        page\n        pageSize\n        totalItems\n      }\n      posts {\n        id\n        title\n        content\n        author {\n          id \n          name\n          email\n        }\n        comments {\n          id\n        }\n        createdAt\n      }\n\t\t}\n\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation CreatePost($createPostInput: CreatePostInput!) {\n    createPost(createPostInput: $createPostInput) {\n      id\n    }\n  }\n",
): (typeof documents)["\n  mutation CreatePost($createPostInput: CreatePostInput!) {\n    createPost(createPostInput: $createPostInput) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation DeletePost($postId: Int!) {\n    deletePost(postId: $postId) {\n      ...PostItem\n    }\n  }\n",
): (typeof documents)["\n  mutation DeletePost($postId: Int!) {\n    deletePost(postId: $postId) {\n      ...PostItem\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nquery ViewPost($id: Int!) {\n  viewPost(id: $id) {\n    ...PostItem\n    category {\n      ...CategoryItem\n    }\n    comments {\n      ...CommentItem\n    }\n  }\n}\n",
): (typeof documents)["\nquery ViewPost($id: Int!) {\n  viewPost(id: $id) {\n    ...PostItem\n    category {\n      ...CategoryItem\n    }\n    comments {\n      ...CommentItem\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation UpdatePost($postId: Int!, $updateData: UpdatePostInput!) {\n    updatePost(postId: $postId, updateData: $updateData) {\n      ...PostItem\n      category {\n        ...CategoryItem\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation UpdatePost($postId: Int!, $updateData: UpdatePostInput!) {\n    updatePost(postId: $postId, updateData: $updateData) {\n      ...PostItem\n      category {\n        ...CategoryItem\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nquery SearchPosts($searchCriteria: PostSearchInput!,$pagination:PaginationInput!) {\n  searchPosts(searchCriteria: $searchCriteria, pagination:$pagination) {\n    pagination {\n        page\n        pageSize\n        totalItems\n      }\n      posts {\n        id\n        title\n        content\n        author {\n          id \n          name\n          email\n        }\n        comments {\n          id\n        }\n        category {\n          name\n        }\n        createdAt\n      }\n  }\n}\n",
): (typeof documents)["\nquery SearchPosts($searchCriteria: PostSearchInput!,$pagination:PaginationInput!) {\n  searchPosts(searchCriteria: $searchCriteria, pagination:$pagination) {\n    pagination {\n        page\n        pageSize\n        totalItems\n      }\n      posts {\n        id\n        title\n        content\n        author {\n          id \n          name\n          email\n        }\n        comments {\n          id\n        }\n        category {\n          name\n        }\n        createdAt\n      }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tquery FilterPostsByCategory($categoryId: Int!) {\n\t\tfilterPostsByCategory(categoryId: $categoryId) {\n        id\n        title\n        content\n        author {\n          id \n          name\n          email\n        }\n        comments {\n          id\n        }\n        category {\n          name\n        }\n        createdAt\n\t\t}\n\t}\n",
): (typeof documents)["\n\tquery FilterPostsByCategory($categoryId: Int!) {\n\t\tfilterPostsByCategory(categoryId: $categoryId) {\n        id\n        title\n        content\n        author {\n          id \n          name\n          email\n        }\n        comments {\n          id\n        }\n        category {\n          name\n        }\n        createdAt\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation AddComment($createCommentInput: CreateCommentInput!) {\n    addComment(createCommentInput: $createCommentInput) {\n      ...CommentItem\n    }\n  }\n",
): (typeof documents)["\n  mutation AddComment($createCommentInput: CreateCommentInput!) {\n    addComment(createCommentInput: $createCommentInput) {\n      ...CommentItem\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation UpdateComment($updateCommentInput: UpdateCommentInput!) {\n    updateComment(updateCommentInput: $updateCommentInput) {\n      ...CommentItem\n    }\n  }\n",
): (typeof documents)["\n  mutation UpdateComment($updateCommentInput: UpdateCommentInput!) {\n    updateComment(updateCommentInput: $updateCommentInput) {\n      ...CommentItem\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation DeleteComment($commentId: Int!) {\n    deleteComment(commentId: $commentId) {\n      id\n    }\n  }\n",
): (typeof documents)["\n  mutation DeleteComment($commentId: Int!) {\n    deleteComment(commentId: $commentId) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  subscription OnCommentAdded($postId: Int!) {\n    onCommentAdded(postId: $postId) {\n      ...CommentItem\n    }\n  }\n",
): (typeof documents)["\n  subscription OnCommentAdded($postId: Int!) {\n    onCommentAdded(postId: $postId) {\n      ...CommentItem\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      id\n    }\n  }\n",
): (typeof documents)["\n  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $createCategoryInput) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation AssignCategoryToPost($postId: Int!, $categoryId: Int!) {\n    assignCategoryToPost(postId: $postId,categoryId: $categoryId) {\n      id\n      category {\n        ...CategoryItem\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation AssignCategoryToPost($postId: Int!, $categoryId: Int!) {\n    assignCategoryToPost(postId: $postId,categoryId: $categoryId) {\n      id\n      category {\n        ...CategoryItem\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query FindCategoryByName($name: String!) {\n    findCategoryByName(name: $name) {     \n      id\n    }\n  }\n",
): (typeof documents)["\n  query FindCategoryByName($name: String!) {\n    findCategoryByName(name: $name) {     \n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nquery ViewUserProfile {\n  viewUserProfile {\n    id\n    email\n    name\n    role {\n      id\n    }\n  }\n}\n",
): (typeof documents)["\nquery ViewUserProfile {\n  viewUserProfile {\n    id\n    email\n    name\n    role {\n      id\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation UpdateUserProfile($updateData: UpdateUserInput!) {\n  updateUserProfile(updateData: $updateData) {\n    id\n    email\n    name\n    role {\n      id\n    }\n  }\n}\n",
): (typeof documents)["\nmutation UpdateUserProfile($updateData: UpdateUserInput!) {\n  updateUserProfile(updateData: $updateData) {\n    id\n    email\n    name\n    role {\n      id\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation DeleteUser($id: Int!) {\n  deleteUser(id: $id) {\n    email\n  }\n}\n",
): (typeof documents)["\nmutation DeleteUser($id: Int!) {\n  deleteUser(id: $id) {\n    email\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
