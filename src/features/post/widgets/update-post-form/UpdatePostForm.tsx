import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import usePost from "../../service/usePost"
import { useEffect } from "react"
import { ApolloError } from "@apollo/client"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import useUser from "@/features/user/service/useUser"
import PostForm from "../../components/post-form/PostForm"
import { useFragment } from "@/lib/graphql"
import { CategoryFragment, PostFragment } from "../../fragments"
import { CustomGraphQLError } from "@/types/graphql"

const formSchema = z.object({
	title: z.string().min(3).max(50),
	category: z.string(),
	content: z.string().min(10).max(5000),
})

type WriteFormValues = z.infer<typeof formSchema>

const UpdatePostForm = () => {
	const { toast } = useToast()
	const navigate = useNavigate()
	const { id } = useParams()
	const location = useLocation()

	const postId = Number(id)

	const {
		createCategory,
		createCategoryResult,
		assignCategory,
		assignCategoryResult,
		viewPost,
		viewPostResult,
		updatePost,
		updatePostResult,
		findCategory,
		findCategoryResult,
	} = usePost()

	const { profile, profileResult } = useUser()

	// 🚧 fragment 테스트용도
	const postInfo = useFragment(PostFragment, viewPostResult.data?.viewPost)
	const postCategoryInfo = useFragment(
		CategoryFragment,
		viewPostResult.data?.viewPost.category
	)

	const isLoading =
		updatePostResult.loading ||
		assignCategoryResult.loading ||
		findCategoryResult.loading ||
		createCategoryResult.loading

	const form = useForm<WriteFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			content: "",
			category: "",
		},
	})

	const handleFindCategoryAndUpdatePost = () => {
		findCategory({
			variables: {
				name: form.getValues("category"),
			},
			onError,
			onCompleted: (data) => {
				handleUpdatePost(form.getValues(), data.findCategoryByName?.id)
			},
		})
	}

	const onErrorCreateCategory = (error: ApolloError) => {
		const errorMessage = error.graphQLErrors[0].message

		if (errorMessage.includes("exists")) {
			handleFindCategoryAndUpdatePost()
		} else {
			form.setError("category", {
				type: "validate",
				message: errorMessage,
			})
		}
	}

	const onError = (error: ApolloError) => {
		const serverError = error.graphQLErrors[0] as CustomGraphQLError
		if (serverError.message) {
			const errorMessage = String(
				typeof serverError.message !== "string"
					? serverError?.message?.[0] ?? ""
					: serverError.message
			)

			form.setError("root.serverError", {
				type: String(serverError.statusCode),
				message: errorMessage,
			})
		} else {
			toast({
				variant: "destructive",
				title: "An Error Occurred",
			})
		}
	}

	const handleUpdatePost = (values: WriteFormValues, categoryId?: string) => {
		updatePost({
			variables: {
				postId,
				updateData: {
					title: values.title,
					content: values.content,
				},
			},
			onCompleted: async () => {
				if (categoryId) {
					assignCategory({
						variables: {
							postId,
							categoryId: parseInt(categoryId),
						},
						onError,
					})
				}
				viewPost({
					variables: {
						id: postId,
					},
					fetchPolicy: "cache-and-network",
				})
				form.reset()
				navigate(`/post/${postId}`)
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
			const prevCategoryName = postCategoryInfo?.name
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
				viewPost({
					variables: {
						id: postId,
					},
				})
			}
		})()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [postId])

	useEffect(() => {
		if (postInfo) {
			form.reset({
				title: postInfo.title,
				category: postCategoryInfo?.name ?? "",
				content: postInfo.content,
			})
		}
	}, [postInfo, postCategoryInfo, form])

	return (
		<div>
			<PostForm
				form={form}
				isLoading={isLoading}
				onSubmit={form.handleSubmit(onSubmit)}
				postId={postId}
			/>
		</div>
	)
}

export default UpdatePostForm
