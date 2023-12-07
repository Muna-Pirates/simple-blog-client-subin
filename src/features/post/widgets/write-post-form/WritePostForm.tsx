import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import Spinner from "@/assets/spinner.svg"
import { Input } from "@/components/ui/input"
import usePost from "../../service/usePost"
import { useEffect, useRef } from "react"
import { CreatePostMutation } from "@/lib/graphql/graphql"
import { ApolloError } from "@apollo/client"
import { LIST_POST } from "../../operations"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
	title: z.string().min(3).max(10),
	category: z.string(),
	content: z.string().min(10),
})

type WriteFormValues = z.infer<typeof formSchema>

const WritePostForm = () => {
	const { toast } = useToast()
	const navigate = useNavigate()

	const {
		createPost,
		createPostResult,
		createCategory,
		createCategoryResult,
		assignCategory,
		assignCategoryResult,
	} = usePost()
	const isLoading = createPostResult.loading

	const form = useForm<WriteFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			content: "",
			category: "",
		},
	})

	const watchTextarea = form.watch("content")

	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleClickCancel = () => {
		navigate("/")
	}

	//🚧 임시 에러 핸들링
	const onError = (error: ApolloError) => {
		toast({
			variant: "destructive",
			title: "An Error Occurred",
		})
	}

	const onCompleted = async (
		data: CreatePostMutation,
		categoryName: string
	) => {
		const postId = data.createPost.id

		const categoryData = await createCategory({
			variables: {
				createCategoryInput: {
					name: categoryName,
				},
			},
		})

		assignCategory({
			variables: {
				postId: parseInt(postId),
				categoryId: parseInt(categoryData.data?.createCategory.id || ""),
			},
			onCompleted() {
				form.reset()
				navigate("/")
			},
			refetchQueries: [LIST_POST],
		})
	}

	const preventEnterKeySubmission = (
		e: React.KeyboardEvent<HTMLFormElement>
	) => {
		const target = e.target
		if (e.key === "Enter" && target instanceof HTMLInputElement) {
			e.preventDefault()
		}
	}

	const onSubmit = async (values: WriteFormValues) => {
		createPost({
			variables: {
				createPostInput: {
					title: values.title,
					content: values.content,
				},
			},
			onCompleted: (data) => onCompleted(data, values.category),
			onError,
		})
	}

	useEffect(() => {
		if (textareaRef && textareaRef.current) {
			textareaRef.current.style.height = "0px"
			const scrollHeight = textareaRef.current.scrollHeight
			textareaRef.current.style.height = scrollHeight + "px"
		}
	}, [watchTextarea])

	return (
		<div>
			<Form {...form}>
				<form
					onKeyDown={preventEnterKeySubmission}
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col items-end w-full gap-4"
				>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="w-full"
										placeholder="write title"
										disabled={isLoading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Category</FormLabel>
								<FormControl>
									<Input
										{...field}
										className="w-full"
										placeholder="write category"
										disabled={isLoading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Content</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										className="w-full max-h-96"
										placeholder="write content"
										disabled={isLoading}
										ref={textareaRef}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex gap-2">
						<Button onClick={handleClickCancel} variant="outline">
							Cancel
						</Button>

						<Button type="submit" disabled={isLoading}>
							{isLoading && (
								<img
									src={Spinner}
									className="mr-2 h-4 w-4 animate-spin"
									alt="spinner"
								/>
							)}
							Post
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default WritePostForm
