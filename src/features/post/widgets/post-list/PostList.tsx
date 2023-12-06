import { useNavigate } from "react-router-dom"
import PostItem from "../../components/post-item/PostItem"
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
		<ul className="flex flex-row flex-wrap gap-8">
			{posts.map((post: IPostItem) => (
				<PostItem key={post.id} {...post} onClickPost={handleClickPost} />
			))}
		</ul>
	)
}

export default PostList
