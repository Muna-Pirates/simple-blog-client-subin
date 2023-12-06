import { useParams } from "react-router-dom"
import usePost from "../../service/usePost"
import { useEffect } from "react"
import Spinner from "@/assets/spinner.svg"
import { formatYYMMDD } from "@/lib/formatDate"
import { Badge } from "@/components/ui/badge"
import CommentForm from "../../widgets/comment-form/CommentForm"
import CommentList from "../../widgets/comment-list/CommentList"

const Post = () => {
	const { id } = useParams()
	const { viewPost, viewPostResult } = usePost()

	const postId = Number(id)
	const postInfo = viewPostResult.data?.viewPost

	useEffect(() => {
		if (postId) {
			viewPost({
				variables: {
					id: postId,
				},
			})
		}
	}, [postId, viewPost])

	if (viewPostResult.loading)
		return (
			<div>
				<img
					src={Spinner}
					className="mr-2 h-4 w-4 animate-spin"
					alt="spinner"
				/>
			</div>
		)

	if (viewPostResult.error?.name || !postInfo) return <div>Error Occurred</div>

	if (!postId) return

	return (
		<div className="w-full max-w-7xl h-full py-16">
			{/** HEADER */}
			<div className="mb-12">
				<h1 className="text-5xl font-bold mb-8">{postInfo.title}</h1>
				<h2 className="text-xl flex gap-2">
					<span className="font-semibold">{postInfo.author.name}</span>
					<span>·</span>
					<span className="text-lg text-gray-600">
						{formatYYMMDD(postInfo.createdAt)}
					</span>
				</h2>
				{postInfo.categories && (
					<div>
						<Badge className="bg-green-700">{postInfo.categories?.name}</Badge>
					</div>
				)}
			</div>

			{/** CONTENT */}
			<div>{postInfo.content}</div>
			<hr className="border-y-1 border-gray-200 my-10" />

			{/** COMMENT */}
			<CommentForm postId={postId} />

			{/** COMMENT LIST */}
			<CommentList postId={postId} />
		</div>
	)
}

export default Post
