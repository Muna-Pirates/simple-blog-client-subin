import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import useUser from "../../service/useUser"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
	email: z.string().email(),
	name: z.string(),
})

type ProfileFormValues = z.infer<typeof formSchema>

const ProfileForm = () => {
	const { userProfile, userProfileResult, update, updateResult } = useUser()
	const { toast } = useToast()

	const { loading } = userProfileResult

	console.log(updateResult)

	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			name: "",
		},
	})

	//🚧 임시 에러 핸들링
	const onError = () => {
		toast({
			variant: "destructive",
			title: "An Error Occurred",
		})
	}

	const onSubmit = async (values: ProfileFormValues) => {
		const id = userProfile?.viewUserProfile?.id

		if (id) {
			update({
				variables: {
					updateData: {
						...values,
						id,
					},
				},
				onError,
			})
		}
	}

	useEffect(() => {
		if (userProfile?.viewUserProfile) {
			const defaultValues = {
				email: userProfile.viewUserProfile.email,
				name: userProfile.viewUserProfile.name,
			} as ProfileFormValues

			form.reset(defaultValues)
		}
	}, [userProfile, form])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>User name</FormLabel>
							<FormControl>
								<Input disabled={loading} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="name@example.com"
									type="email"
									disabled={loading}
									required
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Update profile</Button>
			</form>
		</Form>
	)
}

export default ProfileForm
