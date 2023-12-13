/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  posts?: Maybe<Array<Post>>;
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  authorId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  post: Post;
  postId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateCategoryInput = {
  name: Scalars['String']['input'];
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  postId: Scalars['Int']['input'];
};

export type CreatePostInput = {
  content: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  roleId?: InputMaybe<Scalars['Int']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Comment;
  /** 포스트에 카테고리를 할당합니다. */
  assignCategoryToPost: Post;
  createCategory: Category;
  /** 새로운 포스트를 생성합니다. */
  createPost: Post;
  deleteComment: Comment;
  /** 특정 포스트를 삭제합니다. */
  deletePost: Post;
  deleteUser: User;
  loginUser: AuthPayload;
  registerUser: User;
  updateComment: Comment;
  /** 기존 포스트를 업데이트합니다. */
  updatePost: Post;
  updateUserProfile: User;
};


export type MutationAddCommentArgs = {
  createCommentInput: CreateCommentInput;
};


export type MutationAssignCategoryToPostArgs = {
  categoryId: Scalars['Int']['input'];
  postId: Scalars['Int']['input'];
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['Int']['input'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginUserArgs = {
  credentials: LoginInput;
};


export type MutationRegisterUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationUpdateCommentArgs = {
  updateCommentInput: UpdateCommentInput;
};


export type MutationUpdatePostArgs = {
  postId: Scalars['Int']['input'];
  updateData: UpdatePostInput;
};


export type MutationUpdateUserProfileArgs = {
  updateData: UpdateUserInput;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
};

export type PaginationInput = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};

/** 게시글을 나타내는 객체 */
export type Post = {
  __typename?: 'Post';
  author: User;
  /** 게시글 작성자의 ID */
  authorId: Scalars['Int']['output'];
  category?: Maybe<Category>;
  /** 게시글의 카테고리 ID (없을 수 있음) */
  categoryId?: Maybe<Scalars['Int']['output']>;
  comments: Array<Comment>;
  /** 게시글의 내용 */
  content: Scalars['String']['output'];
  /** 게시글이 생성된 날짜 및 시간 */
  createdAt: Scalars['DateTime']['output'];
  /** 게시글의 고유 식별자 */
  id: Scalars['ID']['output'];
  /** 게시글의 제목 */
  title: Scalars['String']['output'];
  /** 게시글이 마지막으로 업데이트된 날짜 및 시간 */
  updatedAt: Scalars['DateTime']['output'];
};

export type PostPaginationResult = {
  __typename?: 'PostPaginationResult';
  pagination: PaginationInfo;
  posts: Array<Post>;
};

export type PostSearchInput = {
  authorId?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  /** 특정 카테고리에 속하는 포스트를 필터링합니다. */
  filterPostsByCategory: Array<Post>;
  findCategoryByName?: Maybe<Category>;
  listComments: Array<Comment>;
  /** 포스트 목록을 페이징하여 반환합니다. */
  listPosts: PostPaginationResult;
  /** 주어진 검색 조건에 따라 포스트를 검색합니다. */
  searchPosts: PostPaginationResult;
  /** 특정 ID의 포스트를 조회합니다. */
  viewPost: Post;
  viewUserProfile?: Maybe<User>;
};


export type QueryFilterPostsByCategoryArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QueryFindCategoryByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryListCommentsArgs = {
  postId: Scalars['Int']['input'];
};


export type QueryListPostsArgs = {
  pagination: PaginationInput;
};


export type QuerySearchPostsArgs = {
  pagination: PaginationInput;
  searchCriteria: PostSearchInput;
};


export type QueryViewPostArgs = {
  id: Scalars['Int']['input'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  users: Array<User>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onCommentAdded: Comment;
};


export type SubscriptionOnCommentAddedArgs = {
  postId: Scalars['Int']['input'];
};

export type UpdateCommentInput = {
  content: Scalars['String']['input'];
  id: Scalars['Int']['input'];
};

export type UpdatePostInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  comments: Array<Comment>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  posts: Array<Post>;
  role: Role;
  updatedAt: Scalars['DateTime']['output'];
};

export type RegisterUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'User', id: number, email: string, name?: string | null, role: { __typename?: 'Role', id: string } } };

export type LoginUserMutationVariables = Exact<{
  credentials: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: number, email: string, name?: string | null, role: { __typename?: 'Role', id: string } } } };

export type ListPostsQueryVariables = Exact<{
  pagination: PaginationInput;
}>;


export type ListPostsQuery = { __typename?: 'Query', listPosts: { __typename?: 'PostPaginationResult', pagination: { __typename?: 'PaginationInfo', page: number, pageSize: number, totalItems: number }, posts: Array<{ __typename?: 'Post', id: string, title: string, content: string, createdAt: any, author: { __typename?: 'User', id: number, name?: string | null, email: string }, comments: Array<{ __typename?: 'Comment', id: string }>, category?: { __typename?: 'Category', id: string, name: string } | null }> } };

export type CreatePostMutationVariables = Exact<{
  createPostInput: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string } };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'Post', id: string } };

export type ViewPostQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ViewPostQuery = { __typename?: 'Query', viewPost: { __typename?: 'Post', id: string, title: string, content: string, createdAt: any, author: { __typename?: 'User', id: number, name?: string | null, email: string }, category?: { __typename?: 'Category', id: string, name: string } | null } };

export type UpdatePostMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
  updateData: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: string } };

export type ListCommentsQueryVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type ListCommentsQuery = { __typename?: 'Query', listComments: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: number, name?: string | null, email: string } }> };

export type AddCommentMutationVariables = Exact<{
  createCommentInput: CreateCommentInput;
}>;


export type AddCommentMutation = { __typename?: 'Mutation', addComment: { __typename?: 'Comment', id: string } };

export type UpdateCommentMutationVariables = Exact<{
  updateCommentInput: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'Comment', id: string } };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['Int']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'Comment', id: string } };

export type OnCommentAddedSubscriptionVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type OnCommentAddedSubscription = { __typename?: 'Subscription', onCommentAdded: { __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: number, name?: string | null, email: string } } };

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: string } };

export type AssignCategoryToPostMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
  categoryId: Scalars['Int']['input'];
}>;


export type AssignCategoryToPostMutation = { __typename?: 'Mutation', assignCategoryToPost: { __typename?: 'Post', id: string } };

export type FindCategoryByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type FindCategoryByNameQuery = { __typename?: 'Query', findCategoryByName?: { __typename?: 'Category', id: string } | null };

export type ViewUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewUserProfileQuery = { __typename?: 'Query', viewUserProfile?: { __typename?: 'User', id: number, email: string, name?: string | null, role: { __typename?: 'Role', id: string } } | null };

export type UpdateUserProfileMutationVariables = Exact<{
  updateData: UpdateUserInput;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUserProfile: { __typename?: 'User', id: number, email: string, name?: string | null, role: { __typename?: 'Role', id: string } } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', email: string } };


export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"credentials"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"credentials"},"value":{"kind":"Variable","name":{"kind":"Name","value":"credentials"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const ListPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListPostsQuery, ListPostsQueryVariables>;
export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createPostInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createPostInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createPostInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeletePostMutation, DeletePostMutationVariables>;
export const ViewPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ViewPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ViewPostQuery, ViewPostQueryVariables>;
export const UpdatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdatePostMutation, UpdatePostMutationVariables>;
export const ListCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ListCommentsQuery, ListCommentsQueryVariables>;
export const AddCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCommentInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCommentInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCommentInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddCommentMutation, AddCommentMutationVariables>;
export const UpdateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCommentInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCommentInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCommentInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const OnCommentAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnCommentAdded"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onCommentAdded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<OnCommentAddedSubscription, OnCommentAddedSubscriptionVariables>;
export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCategoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCategoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const AssignCategoryToPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignCategoryToPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignCategoryToPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AssignCategoryToPostMutation, AssignCategoryToPostMutationVariables>;
export const FindCategoryByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindCategoryByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findCategoryByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<FindCategoryByNameQuery, FindCategoryByNameQueryVariables>;
export const ViewUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ViewUserProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewUserProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ViewUserProfileQuery, ViewUserProfileQueryVariables>;
export const UpdateUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;