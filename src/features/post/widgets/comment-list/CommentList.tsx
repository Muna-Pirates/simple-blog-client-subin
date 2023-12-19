import { useEffect, useState } from "react"
import Spinner from "@/assets/spinner.svg"
import { formatYYMMDD } from "@/lib/formatDate"
import CommentItem from "../comment-item/CommentItem"
import useUser from "@/features/user/service/useUser"
import { ADD_COMMENT_SUBSCRIPTION } from "../../operations"
import { QueryResult } from "@apollo/client"
import { Exact, ViewPostQuery } from "@/lib/graphql/graphql"
import { useFragment } from "@/lib/graphql"
import { CommentFragment } from "../../fragments"

interface ICommentListProps {
	postId: number
	viewPostResult: QueryResult<
		ViewPostQuery,
		Exact<{
			id: number
		}>
	>
}
const CommentList = ({ postId, viewPostResult }: ICommentListProps) => {
	const [clickedEditCommentId, setEditClickedCommentId] = useState<number>()
	const [clickedDeleteCommentId, setClickedDeleteCommentId] = useState<number>()

	const { profile } = useUser()

	const userID = profile?.viewUserProfile?.id
	const commentsData = viewPostResult.data?.viewPost.comments

	const comments = useFragment(CommentFragment, commentsData)

	const handleClickEdit = (id: number) => {
		setEditClickedCommentId(id)
	}
	const handleClickDelete = (id: number) => {
		setClickedDeleteCommentId(id)
	}
	const handleClickCancel = () => {
		setEditClickedCommentId(undefined)
	}

	const subscribeToNewComments = () => {
		viewPostResult.subscribeToMore({
			document: ADD_COMMENT_SUBSCRIPTION,
			variables: {
				postId,
			},
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev
				const newCommentItem = subscriptionData.data.onCommentAdded

				return Object.assign({}, prev, {
					viewPost: {
						comments: [...prev.viewPost.comments, newCommentItem],
					},
				})
			},
		})
	}

	useEffect(() => subscribeToNewComments(), [])

	if (viewPostResult.loading)
		return (
			<div>
				<img
					src={Spinner}
					className="mr-2 h-4 w-4 animate-spin"
					alt="spinner"
				/>
			</div>
		)

	if (!postId || !comments?.length) return

	return (
		<div className="mt-8">
			<strong className="text-xl">{comments.length} comment</strong>
			<ul>
				{comments.map((comment) => {
					const { id, author, createdAt, content } = comment
					const commentId = parseInt(id)
					const authorName = author.name || author.email.split("@")[0]

					return (
						<li
							key={comment.id}
							className="border-b-2 last:border-b-0 border-gray-100 py-4"
						>
							<CommentItem
								id={commentId}
								authorName={authorName}
								content={content}
								createdDate={formatYYMMDD(createdAt)}
								isMine={userID === author.id}
								isEditing={Boolean(clickedEditCommentId === commentId)}
								isDeleting={Boolean(clickedDeleteCommentId === commentId)}
								onClickEdit={() => handleClickEdit(commentId)}
								onClickDelete={() => handleClickDelete(commentId)}
								onClickCancel={handleClickCancel}
							/>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default CommentList
