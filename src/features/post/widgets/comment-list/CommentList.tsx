import { useEffect } from "react"
import CommentItem from "../../components/comment-item/CommentItem"
import useComment from "../../service/useComment"
import Spinner from "@/assets/spinner.svg"
import { formatYYMMDD } from "@/lib/formatDate"
import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import client from "@/lib/client/apollo"
import { USER_PROFILE } from "@/features/user/operations"

interface ICommentListProps {
	postId: number
}
const CommentList = ({ postId }: ICommentListProps) => {
	const { listComments, listCommentsResult } = useComment()
	const comments = listCommentsResult.data?.listComments

	const profile = client.readQuery({
		query: USER_PROFILE,
	})
	const userID = profile?.viewUserProfile?.id

	const handleClickEdit = () => {}
	const handleClickDelete = () => {}

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
				{comments.map((comment) => (
					<li
						key={comment.id}
						className="border-b-2 last:border-b-0 border-gray-100 py-4"
					>
						<CommentItem
							authorName={comment.author.name || comment.author.email}
							content={comment.content}
							createdDate={formatYYMMDD(comment.createdAt)}
							isCommentAuthor={userID === comment.author.id}
							onClickEdit={handleClickEdit}
						/>
					</li>
				))}
			</ul>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete this
						comment.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleClickDelete}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</div>
	)
}

export default CommentList
