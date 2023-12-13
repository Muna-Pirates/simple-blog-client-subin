import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import useComment from "../../service/useComment"
import Spinner from "@/assets/spinner.svg"
import { LIST_COMMENTS } from "../../operations"
import { MouseEvent } from "react"

const formSchema = z.object({
	content: z.string().min(3),
})

type CommentUpdateFormValues = z.infer<typeof formSchema>

interface ICommentUpdateFormProps {
	commentId: number
	content: string
	onClickCancel: () => void
}

const CommentUpdateForm = ({
	commentId,
	content,
	onClickCancel,
}: ICommentUpdateFormProps) => {
	const { toast } = useToast()
	const { updateComment, updateCommentResult } = useComment()

	const isLoading = updateCommentResult.loading

	const form = useForm<CommentUpdateFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content,
		},
	})

	const handleClickCancel = (e: MouseEvent) => {
		e.preventDefault()
		onClickCancel()
	}

	const onCompleted = () => {
		form.reset()
		onClickCancel()
	}

	//🚧 임시 에러 핸들링
	const onError = () => {
		toast({
			variant: "destructive",
			title: "An Error Occurred",
		})
	}

	const onSubmit = async (values: CommentUpdateFormValues) => {
		updateComment({
			variables: {
				updateCommentInput: {
					id: commentId,
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
							Update Comment
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default CommentUpdateForm
