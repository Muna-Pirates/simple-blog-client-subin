import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

export interface IPostItemProps {
	id: number
	title: string
	content: string
	authorName: string
	commentsCount: number
	createdDate: string
}

const PostItem = ({
	id,
	title,
	commentsCount,
	content,
	createdDate,
	authorName,
}: IPostItemProps) => {
	return (
		<Card className="border-none shadow-md hover:shadow-lg">
			<CardHeader className="border-b-2 border-b-gray-100">
				<CardTitle>{title}</CardTitle>
				<CardDescription>
					by <strong>{authorName}</strong>
				</CardDescription>
			</CardHeader>
			<CardContent className="pt-6">
				<p className="h-22 overflow-hidden whitespace-normal text-ellipsis break-words line-clamp-3">
					{content}
				</p>
			</CardContent>
			<CardFooter className="flex flex-wrap gap-2 text-sm text-gray-400">
				<p>{createdDate}</p>
				<p>{commentsCount}개의 댓글</p>
			</CardFooter>
		</Card>
	)
}

export default PostItem
