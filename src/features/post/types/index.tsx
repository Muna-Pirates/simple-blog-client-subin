export interface IPostItem {
	id: string
	title: string
	content: string
	authorName: string
	commentsCount: number
	createdDate: string
	onClickPost?: (id: string) => void
}

export interface ISearchPostItem extends IPostItem {
	categoryName?: string
}
