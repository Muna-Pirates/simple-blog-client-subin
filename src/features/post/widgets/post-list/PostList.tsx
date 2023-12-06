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

	return (
		<ul className="grid gap-8 max-w-7xl grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{posts.map((post: IPostItem) => (
				<PostItem key={post.id} {...post} onClickPost={handleClickPost} />
			))}
		</ul>
	)
}

export default PostList
