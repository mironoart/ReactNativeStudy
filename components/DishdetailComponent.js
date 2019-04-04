import React from 'react'
import { Card, Icon, Rating, Input } from 'react-native-elements'
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	FlatList,
	Modal,
	Button
} from 'react-native'
import { connect } from 'react-redux'

import { baseUrl } from '../shared/baseUrl'
import { postFavorite, postComment } from '../redux/ActionCreators'

const mapStateToProps = state => {
	return {
		dishes: state.dishes,
		comments: state.comments,
		favorites: state.favorites
	}
}

const mapDispatchToProps = dispatch => ({
	postFavorite: dishId => dispatch(postFavorite(dishId)),
	postComment: comment => dispatch(postComment(comment))
})

function RenderComments(props) {
	const comments = props.comments

	const renderCommentItem = ({ item, index }) => {
		return (
			<View key={index} style={{ margin: 10 }}>
				<Text style={{ fontSize: 14 }}>{item.comment}</Text>
				<Rating readonly={true} imageSize={10} startingValue={item.rating} />

				<Text style={{ fontSize: 12 }}>
					{'-- ' + item.author + ', ' + item.date}
				</Text>
			</View>
		)
	}

	return (
		<Card title="Comments">
			<FlatList
				data={comments}
				renderItem={renderCommentItem}
				keyExtractor={item => item.id.toString()}
			/>
		</Card>
	)
}

function RenderDish(props) {
	const dish = props.dish

	if (dish != null) {
		return (
			<Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
				<Text style={{ margin: 10 }}>{dish.description}</Text>
				<View style={styles.centralButtons}>
					<Icon
						raised
						reverse
						name={props.favorite ? 'heart' : 'heart-o'}
						type="font-awesome"
						color="#f50"
						onPress={() =>
							props.favorite ? console.log('Already favorite') : props.onPress()
						}
					/>
					<Icon
						reverse
						name="pencil"
						color="#512DA8"
						type="font-awesome"
						onPress={() => props.toggleModal()}
					/>
				</View>
			</Card>
		)
	} else {
		return <View />
	}
}

const RenderModal = ({
	showModal,
	toggleModal,
	addComment,
	dishId,
	setRating,
	setAuthor,
	setComment
}) => {
	return (
		<Modal
			animationType={'slide'}
			transparent={false}
			visible={showModal}
			onDismiss={() => toggleModal()}
			onRequestClose={() => toggleModal()}
		>
			<View style={styles.modal}>
				<Rating
					showRating
					fractions={1}
					startingValue={5.0}
					onFinishRating={rating => {
						setRating(rating)
					}}
				/>

				<Input
					placeholder="Author"
					leftIcon={{ type: 'font-awesome', name: 'user' }}
					onChangeText={author => {
						setAuthor(author)
					}}
				/>
				<Input
					placeholder="Comment"
					leftIcon={{ type: 'font-awesome', name: 'comment' }}
					onChangeText={comment => {
						setComment(comment)
					}}
				/>

				<View style={styles.modalButtons}>
					<Button
						onPress={() => {
							addComment(dishId)
							toggleModal()
						}}
						color="#512DA8"
						title="Submit"
					/>
					<Button
						onPress={() => {
							toggleModal()
						}}
						color="#808080"
						title="Cancel"
					/>
				</View>
			</View>
		</Modal>
	)
}

class Dishdetail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			favorites: [],
			author: '',
			comment: '',
			rating: 5,
			showModal: false,
			lastCommentId: props.comments.comments.length - 1
		}
	}

	static navigationOptions = {
		title: 'Dish Details'
	}

	markFavorite(dishId) {
		this.props.postFavorite(dishId)
	}
	addComment = dishId => {
		this.props.postComment({
			dishId: dishId,
			lastCommentId: this.state.lastCommentId,
			rating: this.state.rating,
			author: this.state.author,
			comment: this.state.comment
		})
		this.setState({
			lastCommentId: this.state.lastCommentId + 1
		})
	}

	setComment = comment => {
		this.setState({
			comment: comment
		})
	}
	setAuthor = author => {
		this.setState({
			author: author
		})
	}
	setRating = rating => {
		this.setState({
			rating: rating
		})
	}

	toggleModal = () => {
		this.setState({ showModal: !this.state.showModal })
	}

	render() {
		console.log(this.state)
		const dishId = this.props.navigation.getParam('dishId', '')
		return (
			<ScrollView>
				<RenderDish
					dish={this.props.dishes.dishes[+dishId]}
					favorite={this.props.favorites.some(el => el === dishId)}
					onPress={() => this.markFavorite(dishId)}
					toggleModal={this.toggleModal}
				/>
				<RenderComments
					comments={this.props.comments.comments.filter(
						comment => comment.dishId === dishId
					)}
				/>
				<RenderModal
					dishId={dishId}
					toggleModal={this.toggleModal}
					showModal={this.state.showModal}
					setComment={this.setComment}
					setAuthor={this.setAuthor}
					setRating={this.setRating}
					addComment={this.addComment}
				/>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	modal: {
		justifyContent: 'center',
		margin: 20
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		backgroundColor: '#512DA8',
		textAlign: 'center',
		color: 'white',
		marginBottom: 20
	},
	modalText: {
		fontSize: 18,
		margin: 10
	},
	modalButtons: {
		marginTop: 40
	},
	centralButtons: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row'
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dishdetail)
