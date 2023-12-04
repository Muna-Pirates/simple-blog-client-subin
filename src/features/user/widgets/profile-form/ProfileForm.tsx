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
import { gql } from "@/lib/graphql/gql"
import { useQuery } from "@apollo/client"
import { useEffect } from "react"

const GET_USER = gql(`
query ViewUserProfile {
  viewUserProfile {
    id
    email
		name
		roleId
  }
}
`)

const formSchema = z.object({
	email: z.string().email(),
	name: z.string(),
})

type ProfileFormValues = z.infer<typeof formSchema>

const ProfileForm = () => {
	const { data, loading } = useQuery(GET_USER)

	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			name: "",
		},
	})

	const onSubmit = async (values: ProfileFormValues) => {}

	useEffect(() => {
		if (data?.viewUserProfile) {
			const defaultValues = {
				email: data.viewUserProfile.email,
				name: data.viewUserProfile.name,
			} as ProfileFormValues

			form.reset(defaultValues)
		}
	}, [data, form])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					defaultValue={data?.viewUserProfile?.name ?? ""}
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
