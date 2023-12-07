import { ICommentItem } from "@/features/post/types"
import { AlertDialogTrigger } from "@/components/ui/alert-dialog"

const CommentItem = ({
	authorName,
	content,
	createdDate,
	onClickEdit,
}: ICommentItem) => {
	return (
		<div>
			<div className="flex justify-between">
				<h1 className="font-semibold">{authorName}</h1>
				<div>
					<button
						className="text-gray-400 hover:text-gray-600 hover:underline px-2"
						onClick={() => onClickEdit}
					>
						Edit
					</button>

					<AlertDialogTrigger className="text-gray-400 hover:text-gray-600 hover:underline px-2">
						Delete
					</AlertDialogTrigger>
				</div>
			</div>
			<h2 className="text-gray-500 mb-2">{createdDate}</h2>
			<p className="py-2">{content}</p>
		</div>
	)
}

export default CommentItem
