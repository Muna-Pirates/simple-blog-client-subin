import { useNavigate } from "react-router-dom"
import { IPostItem } from "../../types"
import SearchItem from "../../components/search-item/SearchItem"

interface IPostListProps {
	posts: IPostItem[]
}

const SearchList = ({ posts }: IPostListProps) => {
	const navigate = useNavigate()

	const handleClickPost = (id: string) => {
		navigate(`/post/${id}`)
	}

	return (
		<ul className="flex flex-col gap-8 w-full">
			{posts.map((post: IPostItem) => (
				<SearchItem key={post.id} {...post} onClickPost={handleClickPost} />
			))}
		</ul>
	)
}

export default SearchList
