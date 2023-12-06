import { ICommentItem } from "@/features/post/types"

const CommentItem = ({ authorName, content, createdDate }: ICommentItem) => {
	return (
		<div>
			<h1 className="font-semibold">{authorName}</h1>
			<h2 className="text-gray-500 mb-2">{createdDate}</h2>
			<p className="py-2">{content}</p>
		</div>
	)
}

export default CommentItem
