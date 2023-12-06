import { useNavigate } from "react-router-dom"
import PostItem from "../../pages/components/post-item/PostItem"
import { IPostItem } from "../../types"

interface IPostListProps {
	posts: IPostItem[]
}

const PostList = ({ posts }: IPostListProps) => {
	const navigate = useNavigate()

	const handleClickPost = (id: string) => {
		navigate(`/post/${id}`)
	}

	const temp = Array.from({ length: 30 }, () => posts[0])

	return (
		<ul className="flex flex-row flex-wrap gap-8">
			{posts.map((post: IPostItem) => (
				<PostItem key={post.id} {...post} onClickPost={handleClickPost} />
			))}
		</ul>
	)
}

export default PostList
