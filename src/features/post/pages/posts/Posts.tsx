import { useEffect, useMemo, useState } from "react"
import usePost from "../../service/usePost"
import PostList from "../../widgets/post-list/PostList"
import { formatYYMMDD } from "@/lib/formatDate"
import { IPostItem } from "../../types"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"

const Posts = () => {
	const {
		postResults: { data, fetchMore, loading },
	} = usePost()

	const pageSize = 20
	const [page, setPage] = useState(1)
	const [isReachingEnd, setIsReachingEnd] = useState(false)

	const posts = useMemo((): IPostItem[] => {
		const postsList = data?.listPosts.posts

		if (!postsList?.length) {
			return []
		} else {
			return postsList.map(
				({ id, title, content, createdAt, comments, author }) =>
					({
						id,
						title,
						content,
						authorName: author.name || author.email,
						commentsCount: comments?.length ?? 0,
						createdDate: formatYYMMDD(createdAt),
					} as IPostItem)
			)
		}
	}, [data])

	const { setTarget } = useIntersectionObserver({
		rootMargin: "50px",
		onIntersect: (entries) => {
			if (data) {
				const postsCount = data.listPosts.posts.length
				const totalCount = data.listPosts.pagination.totalItems
				const isEnd = Boolean(!postsCount || postsCount === totalCount)

				if (entries[0].isIntersecting && !loading && !isEnd) {
					setPage((prevPage) => prevPage + 1)
				}
				if (isEnd) {
					setIsReachingEnd(true)
				}
			}
		},
	})

	useEffect(() => {
		if (page > 1 && !isReachingEnd) {
			fetchMore({
				variables: {
					pagination: { page, pageSize },
				},
				updateQuery(previousResult, { fetchMoreResult }) {
					const prevPosts = previousResult.listPosts.posts
					const newPosts = fetchMoreResult.listPosts.posts
					if (!fetchMoreResult.listPosts.posts.length) {
						return previousResult
					} else {
						fetchMoreResult.listPosts.posts = [...prevPosts, ...newPosts]
						return {
							...fetchMoreResult,
						}
					}
				},
			})
		}
	}, [page, isReachingEnd, fetchMore])

	if (!posts.length) return

	return (
		<div className="h-full w-full">
			<section className="flex flex-col">
				<PostList posts={posts} />
				<div ref={setTarget} className="w-full h-1"></div>
			</section>
		</div>
	)
}

export default Posts
