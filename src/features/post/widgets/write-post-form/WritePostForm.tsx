import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import usePost from "../../service/usePost"
import { CreatePostMutation } from "@/lib/graphql/graphql"
import { ApolloError } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import PostForm from "../../components/post-form/PostForm"

const formSchema = z.object({
	title: z.string().min(3).max(50),
	category: z.string(),
	content: z.string().min(10).max(5000),
})

type WriteFormValues = z.infer<typeof formSchema>

const WritePostForm = () => {
	const { toast } = useToast()
	const navigate = useNavigate()

	const { createPost, createPostResult, createCategory, assignCategory } =
		usePost()

	const isLoading = createPostResult.loading

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

	const handleCreatePost = (values: WriteFormValues, categoryId?: string) => {
		createPost({
			variables: {
				createPostInput: {
					title: values.title,
					content: values.content,
				},
			},
			onCompleted: async (data: CreatePostMutation) => {
				const postId = data.createPost.id

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
		 * category Input이 있으면 createCategory 먼저 호출
		 * createPost 호출한 후에
		 * category Input이 있으면 assignCategory 호출
		 */

		if (values.category) {
			createCategory({
				variables: {
					createCategoryInput: {
						name: values.category,
					},
				},
				onError: onErrorCreateCategory,
				onCompleted: (data) => {
					handleCreatePost(values, data.createCategory.id)
				},
			})
		} else {
			handleCreatePost(values)
		}
	}

	return (
		<div>
			<PostForm
				form={form}
				isLoading={isLoading}
				onSubmit={form.handleSubmit(onSubmit)}
			/>
		</div>
	)
}

export default WritePostForm
