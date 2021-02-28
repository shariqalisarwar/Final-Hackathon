import React, { Component } from 'react';
import './Bootstrap.min.css';
import './Login.css';
import {Text,View } from 'react-native';
import { Unorderedlist,ListView } from 'react-native-unordered-list';
import { Paragraph } from 'react-native-paper';


class Home extends Component {

    constructor(props) {
        super(props)
        this.gotoLogin = this.gotoLogin.bind(this);
        this.gotoSignup = this.gotoSignup.bind(this);
    }

    gotoLogin() {
        this.props.history.push('/login');
    }
    gotoSignup() {
        this.props.history.push('/signup');
    }

    render() {
        return (
            <View className="col-lg-3 col-md-3 mx-auto my-5 py-5 px-4 bg-white shadow mb-5 border border-light">
                <View id="homeScreen py-5" className="col-12">
                    <View className="mb-5">
                        <Text className="h1 text-center text-primary">Profiles Manager</Text>
                        <Text className="text-center text-dark">Welcome to Profiles Manager</Text>
                    </View>
                    <button type="button" className="btn btn-primary btn-block text-uppercase mb-1" onClick={this.gotoLogin}>Log In</button>
                    <Paragraph className="text-center mb-1">OR<small></small></Paragraph>
                    <button type="button" className="btn btn-outline-primary btn-block text-uppercase mt-0 mb-3" onClick={this.gotoSignup}>Create new account</button>
                </View>
            </View>
        )
    }
}
export default Home;