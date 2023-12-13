import { SearchOutlined } from "@ant-design/icons"
// import { useSearchParams } from "react-router-dom"
// import SearchList from "../../widgets/search-list/SearchList"

const Search = () => {
	// const [searchParams, setSearchParams] = useSearchParams()

	return (
		<div className="w-full max-w-7xl h-full py-16 flex flex-col items-center ">
			<div className="w-full sm:w-3/4  ">
				{/** SEARCH INPUT */}
				<div className="border-2 border-gray-400 flex items-center gap-4 p-4 mb-8">
					<SearchOutlined style={{ fontSize: 30 }} />
					<input
						type="text"
						placeholder="Search..."
						className="text-lg w-full focus-visible:outline-none placeholder:text-lg"
					/>
				</div>

				{/** SEARCH RESULT */}
				{/* <SearchList posts={posts} /> */}
			</div>
		</div>
	)
}

export default Search
