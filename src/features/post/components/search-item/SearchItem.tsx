import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { IPostItem } from "@/features/post/types"

const SearchItem = ({
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
			className="border-none shadow-none flex flex-col hover:cursor-pointer w-full "
			onClick={() => handleClickPost(id)}
		>
			<CardHeader>
				<CardDescription className="text-md mb-3">
					by <strong>{authorName}</strong>
				</CardDescription>
				<CardTitle className="overflow-hidden whitespace-normal text-ellipsis break-words line-clamp-1 ">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-4">
				<p
					className="overflow-hidden whitespace-normal text-ellipsis break-words line-clamp-3"
					style={{ height: 72 }}
				>
					{content}
				</p>
			</CardContent>
			<CardFooter className="flex flex-wrap gap-2 text-sm text-gray-400 border-b-2 border-b-gray-100">
				<p>{createdDate}</p>
				<p>·</p>
				<p>{commentsCount} comment</p>
			</CardFooter>
		</Card>
	)
}

export default SearchItem
