import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { ISearchPostItem } from "@/features/post/types"
import { Badge } from "@/components/ui/badge"

const SearchItem = ({
	id,
	title,
	authorName,
	commentsCount,
	content,
	createdDate,
	categoryName,
	onClickPost,
}: ISearchPostItem) => {
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
			<CardContent>
				<p
					className="overflow-hidden whitespace-normal text-ellipsis break-words line-clamp-2"
					style={{ height: 48 }}
				>
					{content}
				</p>

				{categoryName && (
					<div className="mt-2">
						<Badge className="bg-green-700 text-sm">{categoryName}</Badge>
					</div>
				)}
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
