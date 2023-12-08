import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import useAuth from "@/features/auth/service/useAuth"
import { Textarea } from "@/components/ui/textarea"
import useComment from "../../service/useComment"
import Spinner from "@/assets/spinner.svg"
import { LIST_COMMENTS } from "../../operations"

const formSchema = z.object({
	content: z.string().min(1),
})

type CommentFormValues = z.infer<typeof formSchema>

interface ICommentFormProps {
	postId: number
}

const CommentForm = ({ postId }: ICommentFormProps) => {
	const { isLogin } = useAuth()
	const { toast } = useToast()
	const navigate = useNavigate()
	const { createComment, createCommentResult } = useComment()

	const isLoading = createCommentResult.loading

	const form = useForm<CommentFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: "",
		},
	})

	const onCompleted = () => {
		form.reset()
	}

	//🚧 임시 에러 핸들링
	const onError = () => {
		toast({
			variant: "destructive",
			title: "An Error Occurred",
		})
	}

	const onSubmit = async (values: CommentFormValues) => {
		if (!isLogin) {
			return navigate("/login")
		}
		createComment({
			variables: {
				createCommentInput: {
					postId,
					content: values.content,
				},
			},
			refetchQueries: [LIST_COMMENTS],
			onCompleted,
			onError,
		})
	}

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col items-end w-full gap-4"
				>
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Textarea
										{...field}
										className="w-full"
										placeholder="write comment"
										disabled={isLoading}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<img
								src={Spinner}
								className="mr-2 h-4 w-4 animate-spin"
								alt="spinner"
							/>
						)}
						Post Comment
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default CommentForm
