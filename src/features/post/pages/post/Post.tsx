import { useNavigate, useParams } from "react-router-dom"
import usePost from "../../service/usePost"
import { useEffect } from "react"
import Spinner from "@/assets/spinner.svg"
import { formatYYMMDDHHMMSS } from "@/lib/formatDate"
import { Badge } from "@/components/ui/badge"
import CommentForm from "../../widgets/comment-form/CommentForm"
import CommentList from "../../widgets/comment-list/CommentList"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import useUser from "@/features/user/service/useUser"
import { useFragment } from "@/lib/graphql"
import { CategoryFragment, PostFragment } from "../../fragments"

const Post = () => {
	const { id } = useParams()
	const { toast } = useToast()
	const navigate = useNavigate()
	const { viewPost, viewPostResult, deletePost } = usePost()

	const { profile } = useUser()
	const postId = Number(id)
	// 🚧 fragment 테스트용도
	const postInfo = useFragment(PostFragment, viewPostResult.data?.viewPost)
	const postCategoryInfo = useFragment(
		CategoryFragment,
		viewPostResult.data?.viewPost.category
	)

	const isMyPost = Boolean(profile?.viewUserProfile?.id === postInfo?.author.id)
	const handleClickEdit = () => {
		navigate(`/write/${postId}`, { state: { authorId: postInfo?.author.id } })
	}

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [postId])

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
					<h2 className="text-xl flex gap-2 items-center">
						<span className="font-semibold">
							{postInfo.author.name || postInfo.author.email}
						</span>
						<span>·</span>
						<span className="text-base text-gray-500">
							{formatYYMMDDHHMMSS(postInfo.createdAt)}
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

				{postCategoryInfo?.id && (
					<div className="mt-4">
						<Badge className="bg-green-700 text-sm">
							{postCategoryInfo.name}
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
			<CommentList postId={postId} viewPostResult={viewPostResult} />
		</div>
	)
}

export default Post
