import { useEffect, useMemo } from "react"
import usePost from "../../service/usePost"
import PostList from "../../widgets/post-list/PostList"
import { formatYYMMDD } from "@/lib/formatDate"
import { IPostItem } from "../../types"

const Posts = () => {
	const { getPosts, postsResult } = usePost()

	const posts = useMemo((): IPostItem[] => {
		const postsList = postsResult.data?.listPosts.posts

		if (!postsList?.length) {
			return []
		} else {
			return postsList.map(
				({ id, title, content, createdAt, comments, author }) =>
					({
						id,
						title,
						content,
						authorName: author.name,
						commentsCount: comments?.length ?? 0,
						createdDate: formatYYMMDD(createdAt),
					} as IPostItem)
			)
		}
	}, [postsResult])

	useEffect(() => {
		getPosts({
			variables: {
				pagination: {
					page: 1,
					pageSize: 10,
				},
			},
		})
	}, [getPosts])

	if (!posts.length) return

	return (
		<div className="h-full w-full">
			<section className="flex flex-col">
				<PostList posts={posts} />
			</section>
		</div>
	)
}

export default Posts
