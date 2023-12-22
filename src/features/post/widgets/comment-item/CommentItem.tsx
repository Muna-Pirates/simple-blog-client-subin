import { AlertDialogTrigger } from "@/components/ui/alert-dialog"

import UpdateCommentForm from "../update-comment-form/UpdateCommentForm"
import useComment from "../../service/useComment"
import DeleteCommentDialog from "../../components/delete-comment-dialog/DeleteCommentDialog"
import { Button } from "@/components/ui/button"
import client from "@/lib/client/apollo"

interface ICommentItem {
	id: number
	authorName: string
	content: string
	createdDate: string
	isMine: boolean
	isEditing: boolean
	isDeleting: boolean
	onClickEdit: () => void
	onClickDelete: () => void
	onClickCancel: () => void
}

const CommentItem = ({
	id,
	authorName,
	content,
	createdDate,
	isMine,
	isEditing,
	isDeleting,
	onClickEdit,
	onClickDelete,
	onClickCancel,
}: ICommentItem) => {
	const { deleteComment } = useComment()

	const handleClickDeleteConfirm = () => {
		deleteComment({
			variables: {
				commentId: id,
			},
			onCompleted() {
				client.cache.evict({ id: `Comment:${id}` })
			},
		})
	}

	return (
		<div>
			<div className="flex justify-between">
				<h1 className="font-semibold">{authorName}</h1>

				{isMine && !isEditing && (
					<div>
						<Button
							variant="ghost"
							className="text-gray-400 px-2"
							onClick={onClickEdit}
						>
							Edit
						</Button>

						<AlertDialogTrigger asChild>
							<Button
								variant="ghost"
								className="text-gray-400 px-2"
								onClick={onClickDelete}
							>
								Delete
							</Button>
						</AlertDialogTrigger>
					</div>
				)}
			</div>
			<h2 className="text-gray-500 mb-2">{createdDate}</h2>

			{!isEditing && <p className="py-2">{content}</p>}

			{isEditing && (
				<UpdateCommentForm
					commentId={id}
					content={content}
					onClickCancel={onClickCancel}
				/>
			)}

			{isDeleting && (
				<DeleteCommentDialog onClickDelete={handleClickDeleteConfirm} />
			)}
		</div>
	)
}

export default CommentItem
