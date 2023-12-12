import { useEffect, useMemo, useState } from "react"
import usePost from "../../service/usePost"
import PostList from "../../widgets/post-list/PostList"
import { formatYYMMDD } from "@/lib/formatDate"
import { IPostItem } from "../../types"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"

const PAGE_SIZE = 20

const Posts = () => {
	const {
		getPosts,
		postResults: { data, fetchMore, loading },
	} = usePost()

	const [page, setPage] = useState(1)

	const postsCount = data?.listPosts.posts.length
	const totalCount = data?.listPosts.pagination.totalItems
	const isReachingEnd = Boolean(!postsCount || postsCount === totalCount)

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
			if (entries[0].isIntersecting && !loading && !isReachingEnd) {
				setPage((prevPage) => prevPage + 1)
			}
		},
	})

	//초기 데이터 쿼리
	useEffect(() => {
		getPosts({
			variables: {
				pagination: {
					page: 1,
					pageSize: PAGE_SIZE,
				},
			},
		})
	}, [getPosts])

	useEffect(() => {
		if (page > 1 && !isReachingEnd) {
			fetchMore({
				variables: {
					pagination: { page, pageSize: PAGE_SIZE },
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
