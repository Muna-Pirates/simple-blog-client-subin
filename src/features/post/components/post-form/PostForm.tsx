import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	ServerErrorMessage,
} from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import Spinner from "@/assets/spinner.svg"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"

interface IPostForm {
	form: UseFormReturn<any>
	onSubmit: () => void
	isLoading: boolean
	postId?: number
}

const PostForm = ({ form, onSubmit, isLoading, postId }: IPostForm) => {
	const navigate = useNavigate()

	const watchTextarea = form.watch("content")

	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleClickCancel = () => {
		navigate("/")
	}
	const preventEnterKeySubmission = (
		e: React.KeyboardEvent<HTMLFormElement>
	) => {
		const target = e.target
		if (e.key === "Enter" && target instanceof HTMLInputElement) {
			e.preventDefault()
		}
	}

	// textarea 높이 계산
	useEffect(() => {
		if (textareaRef && textareaRef.current) {
			textareaRef.current.style.height = "0px"
			const scrollHeight = textareaRef.current.scrollHeight
			textareaRef.current.style.height = scrollHeight + "px"
		}
	}, [watchTextarea])

	return (
		<Form {...form}>
			<form
				onKeyDown={preventEnterKeySubmission}
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col items-end w-full gap-4"
			>
				<FormField
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

				{form.formState.errors.root && <ServerErrorMessage />}

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
						{postId && "Update"}
						{!postId && "Post"}
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default PostForm
