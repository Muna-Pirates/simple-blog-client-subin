import { useEffect, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import usePost from "../../service/usePost"
import { ISearchPostItem } from "../../types"
import { formatYYMMDD } from "@/lib/formatDate"
import SearchList from "../../widgets/search-list/SearchList"

const Filter = () => {
	const [searchParams] = useSearchParams()
	const {
		filterPostsByCategory,
		filterPostsByCategoryResult: { data },
	} = usePost()

	const filterBy = searchParams.get("by") ?? ""
	const categoryId = searchParams.get("id") ?? ""

	useEffect(() => {
		if (filterBy && categoryId) {
			filterPostsByCategory({
				variables: {
					categoryId: parseInt(categoryId),
				},
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterBy, categoryId])

	const posts = useMemo((): ISearchPostItem[] => {
		const postsList = data?.filterPostsByCategory

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

	return (
		<div className="w-full max-w-7xl h-full py-16 flex flex-col items-center ">
			<div className="w-full sm:w-3/4  ">
				{/** FILTER RESULT */}
				<section className="flex flex-col">
					{Boolean(!posts.length) && (
						<div className="mb-8 font-semibold">No results</div>
					)}

					{Boolean(posts.length) && (
						<div>
							<div className="mb-8 font-semibold">{posts.length} results</div>
							<SearchList posts={posts} />
						</div>
					)}
				</section>
			</div>
		</div>
	)
}

export default Filter
