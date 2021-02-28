import React, { Component } from 'react';
import './Bootstrap.min.css';
import './Login.css';
import firebaseconfig from './Firebaseconfig';
import swal from 'sweetalert2';
import { Text, View } from 'react-native';
import { Unorderedlist, ListView } from 'react-native-unordered-list';
import { Paragraph } from 'react-native-paper';


class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.gotoSignup = this.gotoSignup.bind(this);
    }

    emailHandler(event) {
        this.setState({
            email: event.target.value,
        })
    }
    passwordHandler(event) {
        this.setState({
            password: event.target.value
        })
    }
    loginHandler(event) {
        // event.preventdefault();
        let userEmail = this.state.email;
        let userPassword = this.state.password;
        var that = this;
        firebaseconfig.auth().signInWithEmailAndPassword(userEmail, userPassword).then((success) => {
            swal({
                type: 'success',
                title: 'Successfully Logged In',
            }).then((value) => {
                // setTimeout(function () {
                // }, 1000)
                firebaseconfig.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        // User is signed in.
                        // var displayName = user.displayName;
                        // var emailVerified = user.emailVerified;
                        // var photoURL = user.photoURL;
                        // var isAnonymous = user.isAnonymous;
                        // var providerData = user.providerData;
                        // var email = user.email;
                        var uid = user.uid;
                        // console.log(email)
                        // console.log(uid)
                        let firebaseRefKey = firebaseconfig.database().ref().child(uid);
                        firebaseRefKey.on('value', (dataSnapShot) => {
                            // console.log(dataSnapShot.val().userStatus);
                            if (dataSnapShot.val().userStatus.company === true) {
                                that.props.history.push('/company-dashboard')
                            } else if (dataSnapShot.val().userStatus.student === true) {
                                that.props.history.push('/student-dashboard')
                            } else if (dataSnapShot.val().userStatus.admin === true) {
                                that.props.history.push('/admin-dashboard')
                            }
                            // if (dataSnapShot.val().userStatus !== null) {
                            // } else {
                            //     swal({
                            //         type: 'error',
                            //         title: 'Account is disabled',
                            //         text: "Your account is disabled due to violation of policy",
                            //     })
                            // }
                        })
                    } else {
                        // User is signed out.
                        // ...
                    }
                });

            });
        }).catch((error) => {
            // Handle Errors here.
            // var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: errorMessage,
            })
        });
    }

    gotoSignup() {
        this.props.history.push('/signup');
    }

    render() {
        return (
            <View className="col-lg-3 col-md-3 mx-auto my-5 py-5 px-4 bg-white shadow mb-5 border border-light">
                <View id="logInForm">
                    <Text className="h1 text-center text-dark mb-4">Log In</Text>
                    <View className="form-group">
                        <label htmlFor="userSIEmail">Email address<span className="text-danger ml-1">*</span></label>
                        <input type="email" value={this.state.email} onChange={this.emailHandler} className="form-control" id="userSIEmail" placeholder="name@example.com" />
                    </View>
                    <View className="form-group">
                        <label htmlFor="userSIPassword">Password<span className="text-danger ml-1">*</span></label>
                        <input type="password" value={this.state.password} onChange={this.passwordHandler} className="form-control" id="userSIPassword" placeholder="Password" />
                    </View>
                    <button type="button" onClick={this.loginHandler} className="btn btn-primary btn-block text-uppercase mb-3">Log In</button>
                    <Paragraph>Don't have an account yet? Click here</Paragraph>
                    <button type="button" className="btn btn-outline-primary btn-block text-uppercase mt-0 mb-3" onClick={this.gotoSignup}>Create new account</button>
                </View>
            </View>
        )
    }
}
export default Login;
