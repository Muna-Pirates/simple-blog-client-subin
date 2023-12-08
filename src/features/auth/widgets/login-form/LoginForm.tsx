import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Spinner from "@/assets/spinner.svg"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import useAuth, { isLoginVar } from "../../service/useAuth"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import sessionStorage from "@/lib/storage/session"
import { TOKEN } from "../../constants"
import { LoginUserMutation } from "@/lib/graphql/graphql"
import { ApolloError } from "@apollo/client"
import { CustomGraphQLError } from "@/types/graphql"

const formSchema = z.object({
	email: z.string().email(),
	password: z.string(),
})

type LoginFormValues = z.infer<typeof formSchema>

const LoginForm = () => {
	const { login, loginResult } = useAuth()
	const { toast } = useToast()
	const navigate = useNavigate()

	const isLoading = loginResult.loading

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const onCompleted = (data: LoginUserMutation) => {
		const token = data.loginUser.token
		sessionStorage.setItem(TOKEN, token)
		isLoginVar(true)
		navigate("/")
	}

	//🚧 임시 에러 핸들링
	const onError = (error: ApolloError) => {
		const serverError = error.graphQLErrors[0] as CustomGraphQLError
		if (serverError.code) {
			const errorMessage = String(
				typeof serverError.code.message !== "string"
					? serverError.code?.message?.[0] ?? ""
					: serverError.code.message
			)

			form.setError("password", {
				type: "validate",
				message: errorMessage,
			})
		} else {
			toast({
				variant: "destructive",
				title: "An Error Occurred",
			})
		}
	}

	const onSubmit = async (values: LoginFormValues) => {
		login({
			variables: {
				credentials: {
					...values,
				},
			},
			onCompleted,
			onError,
		})
	}

	const handleClickSignUp = () => {
		navigate("/register")
	}

	return (
		<div>
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

					<Button type="submit" disabled={isLoading} className="w-full">
						{isLoading && (
							<img
								src={Spinner}
								className="mr-2 h-4 w-4 animate-spin"
								alt="spinner"
							/>
						)}
						Sign In
					</Button>
				</form>
			</Form>

			<div className="mt-8 flex justify-end gap-1">
				<span className="text-sm text-gray-500">Don't have an account?</span>
				<button className="text-sm font-semibold" onClick={handleClickSignUp}>
					Sign Up
				</button>
			</div>
		</div>
	)
}

export default LoginForm
