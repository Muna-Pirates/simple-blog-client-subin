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
			className="flex flex-col flex-grow-0 border-none shadow-md hover:shadow-lg w-80 hover:cursor-pointer dark:bg-gray-900"
			onClick={() => handleClickPost(id)}
		>
			<CardHeader>
				<CardTitle className="overflow-hidden whitespace-normal text-ellipsis break-words line-clamp-1">
					{title}
				</CardTitle>
				<CardDescription>
					by <strong>{authorName}</strong>
				</CardDescription>
			</CardHeader>
			<hr className="border-y-1 border-gray-200 dark:border-gray-700" />

			<CardContent className="pt-6">
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
				<p>{commentsCount} comment</p>
			</CardFooter>
		</Card>
	)
}

export default PostItem
