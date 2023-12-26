import { SearchOutlined } from "@ant-design/icons"
import { Input } from "@/components/ui/input"
import { ChangeEvent, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useDebounce } from "@/hooks/useDebounce"

interface ISearchInput {
	handleSearchPosts: (value: string) => void
}
const SearchInput = ({ handleSearchPosts }: ISearchInput) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const value = searchParams.get("q") ?? ""
	const debouncedValue = useDebounce<string>(value, 500)

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchParams({
			q: event.target.value,
		})
	}

	useEffect(() => {
		setSearchParams({
			q: debouncedValue,
		})

		if (debouncedValue.length) {
			handleSearchPosts(debouncedValue)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue])

	return (
		<div className="border-2 border-gray-400 flex items-center gap-4 p-4 mb-4">
			<SearchOutlined style={{ fontSize: 30 }} />
			<Input
				placeholder="Search..."
				className="text-lg w-full placeholder:text-lg border-0 focus-visible:shadow-none"
				value={value}
				onChange={handleChangeInput}
			/>
		</div>
	)
}

export default SearchInput
