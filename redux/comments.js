import * as ActionTypes from './ActionTypes'

export const comments = (state = { errMess: null, comments: [] }, action) => {
	let newComment
	if (action.payload)
		newComment = {
			id: action.payload.lastCommentId + 1,
			dishId: action.payload.dishId,
			rating: action.payload.rating,
			comment: action.payload.comment,
			author: action.payload.author,
			date: new Date().toISOString()
		}
	console.log('actionactionactionaction', newComment)
	switch (action.type) {
		case ActionTypes.ADD_COMMENTS:
			return { ...state, errMess: null, comments: action.payload }

		case ActionTypes.COMMENTS_FAILED:
			return { ...state, errMess: action.payload }

		case ActionTypes.ADD_COMMENT:
			return { ...state, comments: state.comments.concat(newComment) }

		default:
			return state
	}
}
