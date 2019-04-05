import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	View,
	Text,
	Platform,
	Image,
	StyleSheet,
	ScrollView
} from 'react-native'
import { Icon } from 'react-native-elements'
import {
	createStackNavigator,
	createDrawerNavigator,
	DrawerItems,
	SafeAreaView
} from 'react-navigation'

import Home from './HomeComponent'
import Menu from './MenuComponent'
import About from './AboutComponent'
import Contacts from './ContactComponent'
import Dishdetail from './DishdetailComponent'
import Reservation from './ReservationComponent'
import Favorites from './FavoriteComponent'
import Login from './LoginComponent'

import { baseUrl } from '../shared/baseUrl'
import {
	fetchDishes,
	fetchComments,
	fetchPromos,
	fetchLeaders
} from '../redux/ActionCreators'

const mapStateToProps = state => {
	return {
		dishes: state.dishes,
		comments: state.comments,
		promotions: state.promotions,
		leaders: state.leaders
	}
}

const mapDispatchToProps = dispatch => ({
	fetchDishes: () => dispatch(fetchDishes()),
	fetchComments: () => dispatch(fetchComments()),
	fetchPromos: () => dispatch(fetchPromos()),
	fetchLeaders: () => dispatch(fetchLeaders())
})

const MenuNavigator = createStackNavigator(
	{
		Menu: {
			screen: Menu,
			navigationOptions: ({ navigation }) => ({
				headerLeft: (
					<Icon
						name="menu"
						size={24}
						color="white"
						onPress={() => navigation.toggleDrawer()}
					/>
				)
			})
		},
		Dishdetail: { screen: Dishdetail }
	},
	{
		initialRouteName: 'Menu',
		navigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: '#512DA8'
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				color: '#fff'
			},
			headerLeft: (
				<Icon
					name="menu"
					size={24}
					color="white"
					onPress={() => navigation.toggleDrawer()}
				/>
			)
		})
	}
)

const LoginNavigator = createStackNavigator(
	{
		Login: { screen: Login }
	},
	{
		navigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: '#512DA8'
			},
			headerTitleStyle: {
				color: '#fff'
			},
			headerTintColor: '#fff',
			headerLeft: (
				<Icon
					name="menu"
					size={24}
					iconStyle={{ color: 'white' }}
					onPress={() => navigation.toggleDrawer()}
				/>
			)
		})
	}
)

const HomeNavigator = createStackNavigator(
	{
		Home: { screen: Home }
	},
	{
		navigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: '#512DA8'
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				color: '#fff'
			},
			headerLeft: (
				<Icon
					name="menu"
					size={24}
					color="white"
					onPress={() => navigation.toggleDrawer()}
				/>
			)
		})
	}
)

const AboutNavigator = createStackNavigator(
	{
		About: { screen: About }
	},
	{
		navigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: '#512DA8'
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				color: '#fff'
			},
			headerLeft: (
				<Icon
					name="menu"
					size={24}
					color="white"
					onPress={() => navigation.toggleDrawer()}
				/>
			)
		})
	}
)

const ContactsNavigator = createStackNavigator(
	{
		Contacts: { screen: Contacts }
	},
	{
		navigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: '#512DA8'
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				color: '#fff'
			},
			headerLeft: (
				<Icon
					name="menu"
					size={24}
					color="white"
					onPress={() => navigation.toggleDrawer()}
				/>
			)
		})
	}
)

const ReservationNavigator = createStackNavigator(
	{
		Reservation: { screen: Reservation }
	},
	{
		navigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: '#512DA8'
			},
			headerTitleStyle: {
				color: '#fff'
			},
			headerTintColor: '#fff',
			headerLeft: (
				<Icon
					name="menu"
					size={24}
					iconStyle={{ color: 'white' }}
					onPress={() => navigation.navigate('DrawerToggle')}
				/>
			)
		})
	}
)

const FavoritesNavigator = createStackNavigator(
	{
		Favorites: { screen: Favorites }
	},
	{
		navigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: '#512DA8'
			},
			headerTitleStyle: {
				color: '#fff'
			},
			headerTintColor: '#fff',
			headerLeft: (
				<Icon
					name="menu"
					size={24}
					iconStyle={{ color: 'white' }}
					onPress={() => navigation.navigate('DrawerToggle')}
				/>
			)
		})
	}
)

////////////////////////////////////////////////////////////////////////////////////////////////////
const CustomDrawerContentComponent = props => (
	<ScrollView>
		<SafeAreaView
			style={styles.container}
			forceInset={{ top: 'always', horizontal: 'never' }}
		>
			<View style={styles.drawerHeader}>
				<View style={{ flex: 1 }}>
					<Image source={require('./images/logo.png')} style={styles.drawerImage} />
				</View>
				<View style={{ flex: 2 }}>
					<Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
				</View>
			</View>
			<DrawerItems {...props} />
		</SafeAreaView>
	</ScrollView>
)

const MainNavigator = createDrawerNavigator(
	{
		Login: {
			screen: LoginNavigator,
			navigationOptions: {
				title: 'Login',
				drawerLabel: 'Login',
				drawerIcon: ({ tintColor, focused }) => (
					<Icon
						name="sign-in"
						type="font-awesome"
						size={24}
						iconStyle={{ color: tintColor }}
					/>
				)
			}
		},
		Home: {
			screen: HomeNavigator,
			navigationOptions: {
				title: 'Home',
				drawerLabel: 'Home',
				drawerIcon: ({ tintColor }) => (
					<Icon name="home" type="font-awesome" size={24} color={tintColor} />
				)
			}
		},

		About: {
			screen: AboutNavigator,
			navigationOptions: {
				title: 'About',
				drawerLabel: 'About',
				drawerIcon: ({ tintColor }) => (
					<Icon name="info-circle" type="font-awesome" size={24} color={tintColor} />
				)
			}
		},
		Menu: {
			screen: MenuNavigator,
			navigationOptions: {
				title: 'Menu',
				drawerLabel: 'Menu',
				drawerIcon: ({ tintColor }) => (
					<Icon name="list" type="font-awesome" size={24} color={tintColor} />
				)
			}
		},
		Contacts: {
			screen: ContactsNavigator,
			navigationOptions: {
				title: 'Contacts',
				drawerLabel: 'Contacts',
				drawerIcon: ({ tintColor }) => (
					<Icon
						name="address-card"
						type="font-awesome"
						size={22}
						color={tintColor}
					/>
				)
			}
		},
		Favorites: {
			screen: FavoritesNavigator,
			navigationOptions: {
				title: 'My Favorites',
				drawerLabel: 'My Favorites',
				drawerIcon: ({ tintColor, focused }) => (
					<Icon
						name="heart"
						type="font-awesome"
						size={24}
						iconStyle={{ color: tintColor }}
					/>
				)
			}
		},
		Reservation: {
			screen: ReservationNavigator,
			navigationOptions: {
				title: 'Reserve Table',
				drawerLabel: 'Reserve Table',
				drawerIcon: ({ tintColor, focused }) => (
					<Icon
						name="cutlery"
						type="font-awesome"
						size={24}
						iconStyle={{ color: tintColor }}
					/>
				)
			}
		}
	},
	{
		initialRouteName: 'Home',
		drawerBackgroundColor: '#D1C4E9',
		contentComponent: CustomDrawerContentComponent
	}
)

class Main extends Component {
	componentDidMount() {
		this.props.fetchDishes()
		this.props.fetchComments()
		this.props.fetchPromos()
		this.props.fetchLeaders()
	}

	render() {
		return (
			<View
				style={{
					flex: 1,
					paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
				}}
			>
				<MainNavigator />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	drawerHeader: {
		backgroundColor: '#512DA8',
		height: 140,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row'
	},
	drawerHeaderText: {
		color: 'white',
		fontSize: 24,
		fontWeight: 'bold'
	},
	drawerImage: {
		margin: 10,
		width: 80,
		height: 60
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main)
