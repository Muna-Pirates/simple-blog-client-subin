import PostItem, {
	IPostItemProps,
} from "../../pages/components/post-item/PostItem"

interface IPostListProps {
	posts: IPostItemProps[]
}

const PostList = ({ posts }: IPostListProps) => {
	return (
		<ul className="grid gap-8 max-w-7xl grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full">
			{posts.map((post: IPostItemProps) => (
				<PostItem key={post.id} {...post} />
			))}
		</ul>
	)
}

export default PostList
