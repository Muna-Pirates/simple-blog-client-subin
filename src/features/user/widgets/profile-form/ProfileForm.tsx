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
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import useUser from "../../service/useUser"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import useAuth from "@/features/auth/service/useAuth"

const formSchema = z.object({
	email: z.string().email(),
	name: z.string(),
})

type ProfileFormValues = z.infer<typeof formSchema>

const ProfileForm = () => {
	const {
		userProfile,
		userProfileResult,
		updateUserProfile,
		updateUserProfileResult,
		deleteAccount,
		deleteAccountResult,
	} = useUser()
	const { toast } = useToast()
	const navigate = useNavigate()
	const { logout } = useAuth()

	const id = userProfile?.viewUserProfile?.id
	const isLoading =
		userProfileResult.loading ||
		updateUserProfileResult.loading ||
		deleteAccountResult.loading

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
		if (id) {
			updateUserProfile({
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

	const onCompletedDeleteAccount = () => {
		logout()
		navigate("/")
	}

	const handleClickDeleteAccount = () => {
		if (id) {
			deleteAccount({
				variables: {
					id,
				},
				onCompleted: onCompletedDeleteAccount,
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
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>User name</FormLabel>
								<FormControl>
									<Input disabled={isLoading} {...field} />
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
										disabled={isLoading}
										required
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={isLoading} className="w-full">
						Update Profile
					</Button>
				</form>
			</Form>
			<hr className=" border-1 border-gray-300 my-4" />

			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant="destructive" className="w-full">
						Delete Account
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handleClickDeleteAccount}>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}

export default ProfileForm
