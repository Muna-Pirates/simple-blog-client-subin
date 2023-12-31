import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import useComment from "../../service/useComment"
import Spinner from "@/assets/spinner.svg"
import { MouseEvent } from "react"

const formSchema = z.object({
	content: z.string().min(3),
})

type UpdateCommentFormValues = z.infer<typeof formSchema>

interface IUpdateCommentFormProps {
	commentId: number
	content: string
	onClickCancel: () => void
}

const UpdateCommentForm = ({
	commentId,
	content,
	onClickCancel,
}: IUpdateCommentFormProps) => {
	const { toast } = useToast()
	const { updateComment, updateCommentResult } = useComment()

	const isLoading = updateCommentResult.loading

	const form = useForm<UpdateCommentFormValues>({
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

	const onError = () => {
		toast({
			variant: "destructive",
			title: "An Error Occurred",
		})
	}

	const onSubmit = async (values: UpdateCommentFormValues) => {
		updateComment({
			variables: {
				updateCommentInput: {
					id: commentId,
					content: values.content,
				},
			},
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
							Update Comment
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default UpdateCommentForm
