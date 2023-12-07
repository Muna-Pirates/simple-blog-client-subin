import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import Spinner from "@/assets/spinner.svg"
import { Input } from "@/components/ui/input"
import usePost from "../../service/usePost"
import { KeyboardEvent, useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
	title: z.string(),
	content: z.string(),
})

type WriteFormValues = z.infer<typeof formSchema>

const WritePostForm = () => {
	const { toast } = useToast()
	const { createPost, createPostResult } = usePost()
	const isLoading = createPostResult.loading

	const [categories, setCategories] = useState<string[]>([])

	const form = useForm<WriteFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			content: "",
		},
	})

	const watchTextarea = form.watch("content")

	const categoryInputRef = useRef<HTMLInputElement>(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleClickCancel = () => {}

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

	const onSubmit = async (values: WriteFormValues) => {
		//createPost
		//createCategory
		//assignCategoryToPost
	}

	const handleKeyupCategoryInput = (e: KeyboardEvent<HTMLInputElement>) => {
		if (
			categoryInputRef.current &&
			categoryInputRef.current.value &&
			e.key === "Enter"
		) {
			const inputValue = categoryInputRef.current.value
			if (!categories.includes(inputValue)) {
				setCategories((prev) => [...prev, inputValue])
			}
			categoryInputRef.current.value = ""
		}
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
							</FormItem>
						)}
					/>

					{/** CATEGORY TAG */}
					<div className="flex gap-2 items-center w-full">
						{categories.map((item) => (
							<Badge key={item} className="bg-green-700 text-sm">
								{item}
							</Badge>
						))}

						<Input
							className="border-0 w-48"
							placeholder="enter category"
							disabled={isLoading}
							onKeyUp={handleKeyupCategoryInput}
							ref={categoryInputRef}
						/>
					</div>

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
