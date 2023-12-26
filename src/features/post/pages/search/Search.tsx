import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import usePost from "../../service/usePost"
import { ISearchPostItem } from "../../types"
import { formatYYMMDD } from "@/lib/formatDate"
import SearchList from "../../widgets/search-list/SearchList"
import SearchInput from "../../widgets/search-input/SearchInput"

const PAGE_SIZE = 10

const Search = () => {
	const [searchParams] = useSearchParams()
	const [page, setPage] = useState(1)
	const {
		searchPosts,
		searchPostsResult: { data, fetchMore, loading },
	} = usePost()

	const searchValue = searchParams.get("q") ?? ""
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

	const handleSearchPosts = useCallback(
		(value: string) => {
			searchPosts({
				variables: {
					pagination: {
						page: 1,
						pageSize: PAGE_SIZE,
					},
					searchCriteria: {
						title: value,
						content: value,
					},
				},
			})
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

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
				<SearchInput handleSearchPosts={handleSearchPosts} />

				{/** SEARCH RESULT */}
				<section className="flex flex-col">
					{Boolean(!!searchValue.length && totalCount === 0) && (
						<div className="mb-8 font-semibold">No results</div>
					)}

					{Boolean(!!searchValue.length && totalCount > 0) && (
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
