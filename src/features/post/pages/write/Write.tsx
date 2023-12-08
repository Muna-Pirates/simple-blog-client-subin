import { useParams } from "react-router-dom"
import WritePostForm from "../../widgets/write-post-form/WritePostForm"
import UpdatePostForm from "../../widgets/update-post-form/UpdatePostForm"

const Write = () => {
	const { id } = useParams()

	return (
		<div className="w-full max-w-5xl">
			<h1 className="text-4xl font-bold mb-8">
				{!id && "Write Post"}
				{id && "Update Post"}
			</h1>
			<div>
				{!id && <WritePostForm />}
				{id && <UpdatePostForm />}
			</div>
		</div>
	)
}

export default Write
