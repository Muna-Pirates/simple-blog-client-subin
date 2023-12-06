import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { IPostItem } from "@/features/post/types"

const PostItem = ({
	id,
	title,
	authorName,
	commentsCount,
	content,
	createdDate,
	onClickPost,
}: IPostItem) => {
	const handleClickPost = (id: string) => {
		onClickPost && id && onClickPost(id)
	}

	return (
		<Card
			className="flex flex-col flex-grow-0 border-none shadow-md hover:shadow-lg"
			onClick={() => handleClickPost(id)}
		>
			<CardHeader className="border-b-2 border-b-gray-100">
				<CardTitle>{title}</CardTitle>
				<CardDescription>
					by <strong>{authorName}</strong>
				</CardDescription>
			</CardHeader>
			<CardContent className="pt-6 w-80">
				<p
					className="overflow-hidden whitespace-normal text-ellipsis break-words line-clamp-3"
					style={{ height: 72 }}
				>
					{content}
				</p>
			</CardContent>
			<CardFooter className="flex flex-wrap gap-2 text-sm text-gray-400">
				<p>{createdDate}</p>
				<p>·</p>
				<p>{commentsCount}개의 댓글</p>
			</CardFooter>
		</Card>
	)
}

export default PostItem
