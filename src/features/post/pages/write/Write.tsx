import WritePostForm from "../../widgets/write-post-form/WritePostForm"

const Write = () => {
	return (
		<div className="w-full max-w-5xl">
			<h1 className="text-4xl font-bold mb-8">Write</h1>
			<div>
				<WritePostForm />
			</div>
		</div>
	)
}

export default Write
