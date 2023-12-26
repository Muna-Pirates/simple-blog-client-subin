import { useDebounce } from "@/hooks/useDebounce"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { SearchOutlined } from "@ant-design/icons"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import usePost from "../../service/usePost"
import { ISearchPostItem } from "../../types"
import { formatYYMMDD } from "@/lib/formatDate"
import SearchList from "../../widgets/search-list/SearchList"
import { Input } from "@/components/ui/input"

const PAGE_SIZE = 10

const Search = () => {
	const [_, setSearchParams] = useSearchParams()

	const [value, setValue] = useState("")
	const debouncedValue = useDebounce<string>(value, 500)
	const [page, setPage] = useState(1)
	const {
		searchPosts,
		searchPostsResult: { data, fetchMore, loading },
	} = usePost()

	const postsCount = data?.searchPosts.posts.length || 0
	const totalCount = data?.searchPosts.pagination.totalItems || 0
	const isReachingEnd = Boolean(!postsCount || postsCount === totalCount)

	const posts = useMemo((): ISearchPostItem[] => {
		const postsList = data?.searchPosts.posts

		if (!postsList?.length) {
			return []
		} else {
			return postsList.map(
				({ id, title, content, createdAt, comments, author, category }) =>
					({
						id,
						title,
						content,
						authorName: author.name || author.email,
						commentsCount: comments?.length ?? 0,
						categoryName: category ? category?.name : "",
						createdDate: formatYYMMDD(createdAt),
					}) as ISearchPostItem
			)
		}
	}, [data])

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	useEffect(() => {
		setSearchParams({
			q: debouncedValue,
		})

		if (debouncedValue.length) {
			searchPosts({
				variables: {
					pagination: {
						page: 1,
						pageSize: PAGE_SIZE,
					},
					searchCriteria: {
						title: debouncedValue,
						content: debouncedValue,
					},
				},
			})
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue])

	const { setTarget } = useIntersectionObserver({
		rootMargin: "50px",
		onIntersect: (entries) => {
			if (entries[0].isIntersecting && !loading && !isReachingEnd) {
				setPage((prevPage) => prevPage + 1)
			}
		},
	})

	useEffect(() => {
		if (page > 1 && !isReachingEnd) {
			fetchMore({
				variables: {
					pagination: { page, pageSize: PAGE_SIZE },
				},
				updateQuery(previousResult, { fetchMoreResult }) {
					const prevPosts = previousResult.searchPosts.posts
					const newPosts = fetchMoreResult.searchPosts.posts
					if (!fetchMoreResult.searchPosts.posts.length) {
						return previousResult
					} else {
						fetchMoreResult.searchPosts.posts = [...prevPosts, ...newPosts]
						return {
							...fetchMoreResult,
						}
					}
				},
			})
		}
	}, [page, isReachingEnd, fetchMore])

	return (
		<div className="w-full max-w-7xl h-full py-16 flex flex-col items-center ">
			<div className="w-full sm:w-3/4  ">
				{/** SEARCH INPUT */}
				<div className="border-2 border-gray-400 flex items-center gap-4 p-4 mb-4">
					<SearchOutlined style={{ fontSize: 30 }} />
					<Input
						placeholder="Search..."
						className="text-lg w-full placeholder:text-lg border-0 focus-visible:shadow-none"
						onChange={handleChange}
					/>
				</div>

				{/** SEARCH RESULT */}
				<section className="flex flex-col">
					{Boolean(!!debouncedValue.length && totalCount === 0) && (
						<div className="mb-8 font-semibold">No results</div>
					)}

					{Boolean(!!debouncedValue.length && totalCount > 0) && (
						<div>
							<div className="mb-8 font-semibold">{totalCount} results</div>
							<SearchList posts={posts} />
						</div>
					)}
					<div ref={setTarget} className="w-full h-1"></div>
				</section>
			</div>
		</div>
	)
}

export default Search
