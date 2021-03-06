import React from 'react';
import { connect } from "react-redux";
import {
	ScrollView, View, TextInput, Text, Pressable, ActivityIndicator
} from 'react-native';
import firebase from "../config/firebase";


const variables = {
	primeColor: '#763dcc',
	spacing: 25
};

class LoginScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			loading: false,
			error: null
		};
	};

	logIn = async () => {
		this.setState({loading: true})
		const {email, password} = this.state;
		try {
			const user = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
			this.props.dispatch({type: "SIGN_IN", payload: user})
		} catch (err) {
			this.setState({error: err.message})
		} finally {
			this.setState({loading: false})
		}
	}

	render () {
		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{
					margin: variables.spacing * 2,
					color: variables.primeColor,
				}}
			>
				<Text style={{
					marginVertical: variables.spacing * 2,
					color: variables.primeColor,
					fontSize: 40,
					fontWeight: 'bold'
				}}>
					Log in
				</Text>

				{/* error message display */}
				<Text style={{marginBottom: 20, color:'red'}}>{this.state.error}</Text>

				{/* form inputs */}
				<TextInput
					placeholder="Email"
					value={this.state.email}
					onChangeText={email => this.setState({email})}
					style={[
						styles.input,
						styles.text, {
							marginBottom: variables.spacing
						}
					]}
				/>
				<TextInput
					placeholder="Password"
					value={this.state.password}
					secureTextEntry={true}
					onChangeText={password => this.setState({password})}
					style={[styles.text, styles.input]}
				/>
				<Text style={[
					styles.text, {
						color: '#62aaff',
						alignSelf: 'flex-end',
						marginVertical: 10,
					}
				]}>
					Forgot password?
				</Text>

				{/* Login button */}
				<Pressable
					style={[
						styles.allCenter, {
							paddingVertical: 15,
							marginVertical: variables.spacing * 2,
							backgroundColor: variables.primeColor,
							borderRadius: 10,
							flexDirection: 'row',
						}
					]}
					onPress={this.logIn}
				>
					{
						this.state.loading ? (
							<ActivityIndicator color="#fff" style={{marginLeft: 10}}/>
						) : (
							<Text style={{
								color: '#fff',
								fontSize: 20,
								fontWeight: 'bold',
							}}>
								LOG IN
							</Text>
						)
					}
				</Pressable>

				{/* bottom text */}
				<View style={[
					styles.allCenter, {
						flexDirection: 'row',
					}
				]}>
					<Text style={styles.text}>Don't have an account?</Text>
					<Pressable onPress={() => this.props.navigation.navigate('sign-up')}>
						<Text style={[
							styles.text, {
								marginLeft: 7,
								color: variables.primeColor,
							}
						]}>
							Sign up
						</Text>
					</Pressable>
				</View>
			</ScrollView>
		)
	};
};

const styles = {
	text: {
		fontSize: 17,
	},

	input: {
		paddingBottom: 5,
		borderBottomColor: variables.primeColor,
		borderBottomWidth: 2,
	},

	allCenter: {
		justifyContent: 'center',
		alignItems: 'center',
	},
};


export default connect()(LoginScreen);
