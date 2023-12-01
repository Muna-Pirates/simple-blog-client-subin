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
import useAuth from "../../service/useAuth"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"

const formSchema = z.object({
	email: z.string().email(),
	password: z.string(),
})

const LoginForm = () => {
	const { login, loginResult } = useAuth()
	const { toast } = useToast()
	const navigate = useNavigate()
	const signIn = useAuthStore((state) => state.signIn)

	const isLoading = loginResult.loading

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		login({
			variables: {
				credentials: {
					...values,
				},
			},
			onCompleted: (data) => {
				const token = data.loginUser.token
				signIn(token)
				navigate("/")
			},
			onError: (error) => {
				if (error.graphQLErrors[0].message) {
					form.setError("password", {
						type: "validate",
						message: error.graphQLErrors[0].message,
					})
				} else {
					toast({
						variant: "destructive",
						title: "An Error Occurred",
					})
				}
			}, //🚧 임시 에러 핸들링
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
									placeholder="name@example.com"
									type="email"
									disabled={isLoading}
									required
									{...field}
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
									type="password"
									required
									disabled={isLoading}
									{...field}
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
	)
}

export default LoginForm
