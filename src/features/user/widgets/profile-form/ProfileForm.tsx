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
import { MouseEvent, useEffect, useState } from "react"
import useUser from "../../service/useUser"
import { useToast } from "@/components/ui/use-toast"
import useAuth from "@/features/auth/service/useAuth"
import { USER_PROFILE } from "../../operations"

const formSchema = z.object({
	email: z.string().email(),
	name: z.string(),
})

type ProfileFormValues = z.infer<typeof formSchema>

const ProfileForm = () => {
	const {
		profile,
		profileResult,
		updateUserProfile,
		updateUserProfileResult,
		deleteAccount,
		deleteAccountResult,
	} = useUser()
	const { toast } = useToast()
	const { logout } = useAuth()

	const [editing, setEditing] = useState(false)

	const id = profile?.viewUserProfile?.id

	const isLoading =
		profileResult.loading ||
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
				refetchQueries: [USER_PROFILE],
				onError,
			})
			setEditing(false)
		}
	}

	const handleClickUpdate = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setEditing(true)
	}
	const handleClickCancel = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setEditing(false)
	}

	const onCompletedDeleteAccount = () => {
		logout()
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
		if (profile?.viewUserProfile) {
			const defaultValues = {
				email: profile.viewUserProfile.email,
				name: profile.viewUserProfile.name,
			} as ProfileFormValues

			form.reset(defaultValues)
		}
	}, [profile, form])

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
									<Input {...field} disabled={isLoading || !editing} />
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
										{...field}
										placeholder="name@example.com"
										type="email"
										disabled={isLoading || !editing}
										required
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{editing ? (
						<div className="flex gap-2">
							<Button
								type="button"
								onClick={handleClickCancel}
								variant="outline"
								disabled={isLoading}
								className="w-full"
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isLoading} className="w-full">
								Save
							</Button>
						</div>
					) : (
						<Button
							onClick={handleClickUpdate}
							type="button"
							className="w-full"
						>
							Update Profile
						</Button>
					)}
				</form>
			</Form>

			<hr className=" border-1 border-gray-300 my-4" />

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
		</div>
	)
}

export default ProfileForm
