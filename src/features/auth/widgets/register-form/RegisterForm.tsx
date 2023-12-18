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
import { Input } from "@/components/ui/input"
import Spinner from "@/assets/spinner.svg"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import useAuth from "../../service/useAuth"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { ApolloError } from "@apollo/client"
import { CustomGraphQLError } from "@/types/graphql"
import ErrorMessage from "@/components/ErrorMessage"

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, "Password must be at least 8 characters long"),
	name: z.string(),
})

type RegisterFormValues = z.infer<typeof formSchema>

const RegisterForm = () => {
	const { register, registerResult } = useAuth()
	const { toast } = useToast()
	const navigate = useNavigate()

	const isLoading = registerResult.loading

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
	})

	const onCompleted = () => {
		navigate("/register-complete")
	}

	const onError = (error: ApolloError) => {
		const serverError = error.graphQLErrors[0] as CustomGraphQLError
		if (serverError.message) {
			const errorMessage = String(
				typeof serverError.message !== "string"
					? serverError?.message?.[0] ?? ""
					: serverError.message
			)

			form.setError("root.serverError", {
				type: String(serverError.statusCode),
				message: errorMessage,
			})
		} else {
			toast({
				variant: "destructive",
				title: "An Error Occurred",
			})
		}
	}

	const onSubmit = async (values: RegisterFormValues) => {
		register({
			variables: {
				createUserInput: {
					...values,
					roleId: 1, //user:1, admin:2
				},
			},
			onCompleted,
			onError,
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
									disabled={isLoading}
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="password"
									required
									disabled={isLoading}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} type="text" required disabled={isLoading} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{form.formState.errors.root && <ServerErrorMessage />}

				<Button type="submit" disabled={isLoading} className="w-full">
					{isLoading && (
						<img
							src={Spinner}
							className="mr-2 h-4 w-4 animate-spin"
							alt="spinner"
						/>
					)}
					Sign Up
				</Button>
			</form>
		</Form>
	)
}

export default RegisterForm
