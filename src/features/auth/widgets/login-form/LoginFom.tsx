import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SyntheticEvent, useState } from "react"
import Spinner from "@/assets/spinner.svg"

const LoginFom = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault()
	}

	return (
		<form onSubmit={onSubmit}>
			<div className="grid gap-4">
				<div className="grid gap-1">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						placeholder="name@example.com"
						type="email"
						autoCapitalize="none"
						autoComplete="email"
						autoCorrect="off"
						disabled={isLoading}
					/>
				</div>
				<div className="grid gap-1">
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						type="password"
						autoCapitalize="none"
						autoCorrect="off"
						disabled={isLoading}
					/>
				</div>
				<div className="grid gap-1">
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						type="text"
						autoCapitalize="none"
						autoCorrect="off"
						disabled={isLoading}
					/>
				</div>
				<Button disabled={isLoading}>
					{isLoading && (
						<img
							src={Spinner}
							className="mr-2 h-4 w-4 animate-spin"
							alt="spinner"
						/>
					)}
					Sign Up
				</Button>
			</div>
		</form>
	)
}

export default LoginFom
