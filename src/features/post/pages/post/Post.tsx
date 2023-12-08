import { useNavigate, useParams } from "react-router-dom"
import usePost from "../../service/usePost"
import { useEffect } from "react"
import Spinner from "@/assets/spinner.svg"
import { formatYYMMDD } from "@/lib/formatDate"
import { Badge } from "@/components/ui/badge"
import CommentForm from "../../widgets/comment-form/CommentForm"
import CommentList from "../../widgets/comment-list/CommentList"
import { Button } from "@/components/ui/button"
import { LIST_POST } from "../../operations"
import { useToast } from "@/components/ui/use-toast"
import useUser from "@/features/user/service/useUser"

const Post = () => {
	const { id } = useParams()
	const { toast } = useToast()
	const navigate = useNavigate()
	const { viewPost, viewPostResult, deletePost } = usePost()

	const { profile } = useUser()

	const postId = Number(id)
	const postInfo = viewPostResult.data?.viewPost
	const isMyPost = Boolean(profile?.viewUserProfile?.id === postInfo?.author.id)

	const handleClickEdit = () => {
		navigate(`/write/${postId}`, { state: { authorId: postInfo?.author.id } })
	}

	//🚧 임시 에러 핸들링
	const onError = () => {
		toast({
			variant: "destructive",
			title: "An Error Occurred",
		})
	}

	const onCompletedDelete = async () => {
		navigate("/")
	}
	const handleClickDelete = () => {
		deletePost({
			variables: {
				postId,
			},
			onCompleted: onCompletedDelete,
			onError,
			refetchQueries: [
				{
					query: LIST_POST,
					variables: {
						pagination: {
							page: 1,
							pageSize: 10,
						},
					},
				},
			],
		})
	}

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
				<div className="flex justify-between">
					<h2 className="text-xl flex gap-2">
						<span className="font-semibold">
							{postInfo.author.name || postInfo.author.email}
						</span>
						<span>·</span>
						<span className="text-lg text-gray-600">
							{formatYYMMDD(postInfo.createdAt)}
						</span>
					</h2>

					{isMyPost && (
						<div>
							<Button
								variant="ghost"
								className="text-gray-400 px-2"
								onClick={handleClickEdit}
							>
								Edit
							</Button>
							<Button
								variant="ghost"
								className="text-gray-400 px-2"
								onClick={handleClickDelete}
							>
								Delete
							</Button>
						</div>
					)}
				</div>

				{postInfo.category && (
					<div className="mt-4">
						<Badge className="bg-green-700 text-sm">
							{postInfo.category.name}
						</Badge>
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
