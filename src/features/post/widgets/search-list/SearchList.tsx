import { useNavigate } from "react-router-dom"
import { ISearchPostItem } from "../../types"
import SearchItem from "../../components/search-item/SearchItem"

interface ISearchListProps {
	posts: ISearchPostItem[]
}

const SearchList = ({ posts }: ISearchListProps) => {
	const navigate = useNavigate()

	const handleClickPost = (id: string) => {
		navigate(`/post/${id}`)
	}

	return (
		<ul className="flex flex-col gap-8 w-full">
			{posts.map((post: ISearchPostItem) => (
				<SearchItem key={post.id} {...post} onClickPost={handleClickPost} />
			))}
		</ul>
	)
}

export default SearchList
