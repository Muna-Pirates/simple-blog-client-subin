import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import usePost from "../../service/usePost"
import { useEffect } from "react"
import { UpdatePostMutation } from "@/lib/graphql/graphql"
import { ApolloError } from "@apollo/client"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import useUser from "@/features/user/service/useUser"
import PostForm from "../../components/post-form/PostForm"

const formSchema = z.object({
	title: z.string().min(3).max(10),
	category: z.string(),
	content: z.string().min(10),
})

type WriteFormValues = z.infer<typeof formSchema>

const WritePostForm = () => {
	const { toast } = useToast()
	const navigate = useNavigate()
	const { id: postId } = useParams()
	const location = useLocation()

	const {
		createCategory,
		assignCategory,
		viewPost,
		viewPostResult,
		updatePost,
		updatePostResult,
	} = usePost()

	const { profile, profileResult } = useUser()

	const isLoading = updatePostResult.loading

	const form = useForm<WriteFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			content: "",
			category: "",
		},
	})

	const onErrorCreateCategory = (error: ApolloError) => {
		form.setError("category", {
			type: "validate",
			message: error.graphQLErrors[0].message,
		})
	}

	//🚧 임시 에러 핸들링
	const onError = () => {
		toast({
			variant: "destructive",
			title: "An Error Occurred",
		})
	}

	const handleUpdatePost = (values: WriteFormValues, categoryId?: string) => {
		updatePost({
			variables: {
				postId: parseInt(postId || ""),
				updateData: {
					title: values.title,
					content: values.content,
				},
			},
			onCompleted: async (data: UpdatePostMutation) => {
				const postId = data.updatePost.id

				if (categoryId) {
					assignCategory({
						variables: {
							postId: parseInt(postId),
							categoryId: parseInt(categoryId),
						},
						onCompleted() {
							form.reset()
							navigate("/")
						},
						onError,
					})
				} else {
					form.reset()
					navigate("/")
				}
			},
			onError,
		})
	}

	const onSubmit = async (values: WriteFormValues) => {
		/**
		 * category Input이 있으면
		 * 이전 카테고리 이름과 동일할 경우 createPost 호출
		 * 새로운 카테고리일 경우 createCategory 먼저 호출
		 * createPost 호출한 후에
		 * category Input이 있으면 assignCategory 호출
		 */

		if (values.category) {
			const prevCategoryName = viewPostResult.data?.viewPost.category?.name
			if (values.category === prevCategoryName) {
				handleUpdatePost(values)
			} else {
				createCategory({
					variables: {
						createCategoryInput: {
							name: values.category,
						},
					},
					onError: onErrorCreateCategory,
					onCompleted: (data) => {
						handleUpdatePost(values, data.createCategory.id)
					},
				})
			}
		} else {
			handleUpdatePost(values)
		}
	}

	// 내 글 수정이 아닌 경우 접근 제한
	useEffect(() => {
		const authorId = location.state?.authorId
		const userId = profile?.viewUserProfile?.id

		if (postId && !profileResult.loading && Boolean(authorId !== userId)) {
			navigate("/")
		}
	}, [profile, location, profileResult, navigate, postId])

	useEffect(() => {
		;(async () => {
			if (postId) {
				const result = await viewPost({
					variables: {
						id: parseInt(postId),
					},
				})

				form.reset({
					title: result.data?.viewPost.title,
					category: result.data?.viewPost.category?.name ?? "",
					content: result.data?.viewPost.content,
				})
			}
		})()
	}, [postId, form, viewPost])

	return (
		<div>
			<PostForm
				form={form}
				isLoading={isLoading}
				onSubmit={form.handleSubmit(onSubmit)}
				postId={parseInt(postId || "")}
			/>
		</div>
	)
}

export default WritePostForm
