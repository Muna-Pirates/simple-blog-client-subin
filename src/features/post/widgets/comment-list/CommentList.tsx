import { useEffect, useState } from "react"
import useComment from "../../service/useComment"
import Spinner from "@/assets/spinner.svg"
import { formatYYMMDD } from "@/lib/formatDate"
import client from "@/lib/client/apollo"
import { USER_PROFILE } from "@/features/user/operations"
import CommentItem from "../comment-item/CommentItem"

interface ICommentListProps {
	postId: number
}
const CommentList = ({ postId }: ICommentListProps) => {
	const { listComments, listCommentsResult } = useComment()
	const comments = listCommentsResult.data?.listComments

	const [clickedEditCommentId, setEditClickedCommentId] = useState<number>()
	const [clickedDeleteCommentId, setClickedDeleteCommentId] = useState<number>()

	const profile = client.readQuery({
		query: USER_PROFILE,
	})
	const userID = profile?.viewUserProfile?.id

	const handleClickEdit = (id: number) => {
		setEditClickedCommentId(id)
	}
	const handleClickDelete = (id: number) => {
		setClickedDeleteCommentId(id)
	}
	const handleClickCancel = () => {
		setEditClickedCommentId(undefined)
	}

	useEffect(() => {
		if (postId) {
			listComments({
				variables: {
					postId,
				},
			})
		}
	}, [postId, listComments])

	if (listCommentsResult.loading)
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
