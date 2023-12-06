import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import useAuth from "@/features/auth/service/useAuth"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
	content: z.string(),
})

type CommentFormValues = z.infer<typeof formSchema>

const CommentForm = () => {
	const { isLogin } = useAuth()
	const { toast } = useToast()
	const navigate = useNavigate()

	const form = useForm<CommentFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: "",
		},
	})

	const onCompleted = () => {}

	//🚧 임시 에러 핸들링
	const onError = () => {
		toast({
			variant: "destructive",
			title: "An Error Occurred",
		})
	}

	const onSubmit = async (values: CommentFormValues) => {}

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
										className="w-full"
										{...field}
										placeholder="write comment"
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<Button type="submit" disabled={false}>
						{/* {isLoading && (
							<img
								src={Spinner}
								className="mr-2 h-4 w-4 animate-spin"
								alt="spinner"
							/>
						)} */}
						Post Comment
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default CommentForm
