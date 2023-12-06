import { useEffect } from "react"
import CommentItem from "../../pages/components/comment-item/CommentItem"
import useComment from "../../service/useComment"
import Spinner from "@/assets/spinner.svg"
import { formatYYMMDD } from "@/lib/formatDate"

interface ICommentListProps {
	id?: string
}
const CommentList = ({ id }: ICommentListProps) => {
	const { listComments, listCommentsResult } = useComment()
	const comments = listCommentsResult.data?.listComments

	useEffect(() => {
		if (id) {
			listComments({
				variables: {
					postId: Number(id),
				},
			})
		}
	}, [id, listComments])

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

	if (!id || !comments?.length) return

	return (
		<div className="mt-8">
			<ul>
				{comments.map((comment) => (
					<li className="border-b-2 last:border-b-0 border-gray-100 py-4">
						<CommentItem
							authorName={comment.author.name || ""}
							content={comment.content}
							createdDate={formatYYMMDD(comment.createdAt)}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}

export default CommentList
