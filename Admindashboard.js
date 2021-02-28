import React, { Component } from 'react';
import './Bootstrap.min.css';
import firebaseconfig from './Firebaseconfig';
import swal from 'sweetalert2';
import { Text, View } from 'react-native';
import { Unorderedlist, ListView } from 'react-native-unordered-list';
import { Paragraph } from 'react-native-paper';


class Admindashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showOtherDivs: {
                jobList: true,
                companyList: false,
                studentList: false,
            },
            jobsArray: [],
            companyArray: [],
            studentArray: [],
        }
        // Log Out Handler 
        this.logOut = this.logOut.bind(this);
        this.showOtherDivsHandler = this.showOtherDivsHandler.bind(this);
    }

    componentDidMount() {
        let jobsArray = [];
        let companyArray = [];
        let studentArray = [];
        // let userData;
        var that = this;
        firebaseconfig.auth().onAuthStateChanged(function (user) {
            if (user) {
                // var uid = user.uid;
                // let firebaseRefKey = firebaseconfig.database().ref().child(uid);
                // firebaseRefKey.on('value', (dataSnapShot) => {
                //     userData = dataSnapShot.val();
                //     // userData.uid = uid;
                //     // console.log(userData);
                //     // console.log(userData.uid);
                //     that.setState({
                //         userData: userData,
                //     })
                // })
                let jobRefKey = firebaseconfig.database().ref();
                jobRefKey.once('value', (dataSnapShot) => {
                    for (let key1 in dataSnapShot.val()) {
                        if (dataSnapShot.val()[key1].jobs !== undefined) {
                            for (let key2 in dataSnapShot.val()[key1].jobs) {
                                dataSnapShot.val()[key1].jobs[key2].companyEmail = dataSnapShot.val()[key1].userEmail;
                                jobsArray.push(dataSnapShot.val()[key1].jobs[key2]);
                            }
                        }
                    }
                    that.setState({
                        jobsArray: jobsArray,
                    })
                })

                let companyRefKey = firebaseconfig.database().ref();
                companyRefKey.once('value', (dataSnapShot) => {
                    for (let key in dataSnapShot.val()) {
                        if (dataSnapShot.val()[key].userStatus.company === true) {
                            companyArray.push(dataSnapShot.val()[key])
                        }
                    }
                    that.setState({
                        companyArray: companyArray,
                    })
                })

                let studentRefKey = firebaseconfig.database().ref();
                studentRefKey.once('value', (dataSnapShot) => {
                    for (let key in dataSnapShot.val()) {
                        if (dataSnapShot.val()[key].userStatus.student === true) {
                            studentArray.push(dataSnapShot.val()[key])
                        }
                    }
                    that.setState({
                        studentArray: studentArray,
                    })
                })
            } else {
                console.log("User is not logged in")
            }
        });
    }

    showOtherDivsHandler(event) {
        let showOtherDivs = this.state.showOtherDivs;
        for (let key in showOtherDivs) {
            showOtherDivs[key] = false;
        }
        showOtherDivs[event.target.value] = event.target.checked;
        this.setState({
            showOtherDivs: showOtherDivs
        })
    }

    logOut() {
        firebaseconfig.auth().signOut().then(() => {
            // Sign-out successful.
            swal({
                type: 'success',
                title: 'Successfully Logged Out',
            }).then((value) => {
                // setTimeout(function(){
                // }, 1000)
                this.props.history.push('/')
            });
        }).catch((error) => {
            // An error happened.
            let errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: errorMessage,
            })
        });
    }
    
    render() {

        // Create Job List
        let jobList = this.state.jobsArray.map((value) => {
            return (
                <View key={value.jobUid}>
                    <View className="col-lg-11 col-md-11 p-3 mx-auto border border-bottom-0 border-primary">
                        <Text className="h3 text-dark mb-3">{value.jobTitle}</Text>
                        <View id="jobDetails">
                            <Paragraph className="text-secondary mb-0"><Text>{value.companyName}</Text>,<Text className="ml-3">{value.jobLocation}</Text></Paragraph>
                            <Paragraph className="text-secondary"><Text>Apply Now:</Text><Text className="ml-3">{value.companyEmail}</Text></Paragraph>
                        </View>
                        <Text>{value.jobDescription}</Text>
                    </View>
                    <View className="col-lg-11 col-md-11 py-2 mb-3 mx-auto border border-primary">
                        <View className="row">
                            <View className="col-lg-6 col-lg-6">
                                
                                    <Text className="far fa-calendar-alt text-primary mr-2"></Text><Text>{value.jobPostDate}</Text>
                                    <Text className="fas fa-dollar-sign text-primary ml-3 mr-2"></Text><Text>{value.jobSalary}</Text>
                                
                            </View>
                            <View className="col-lg-6 col-lg-6 text-lg-right text-md-right">
                                <button type="button" onClick={() => {
                                    firebaseconfig.database().ref().child(value.companyUid).child('jobs').child(value.jobUid).remove();
                                    this.componentDidMount();
                                }} className="btn btn-danger mt-lg-0 mt-md-0 mt-3 text-uppercase">Delete Job</button>
                            </View>
                        </View>
                    </View>
                </View>
            )
        })

        // Create Company List
        let companyList = this.state.companyArray.map((value) => {
            return (
                <View key={value.userUid}>
                    <View className="col-lg-11 col-md-11 p-3 mx-auto border border-bottom-0 border-primary">
                        <Text className="h3 text-dark mb-3">{value.userFullName}</Text>
                        <Paragraph className="text-secondary"><Text>{value.userIndustry}</Text><Text className="ml-3">{value.userLocation}</Text></Paragraph>
                        <Paragraph>{value.userBio}</Paragraph>
                    </View>
                    <View className="col-lg-11 col-md-11 py-2 mb-3 mx-auto border border-primary">
                        <View className="row">
                            <View className="col-lg-6 col-lg-6">
                                <Text className="far fa-envelope text-primary mr-2"></Text><Text>{value.userEmail}</Text>
                            </View>
                            <View className="col-lg-6 col-lg-6 text-lg-right text-md-right">
                                <button type="button" onClick={() => {
                                    firebaseconfig.database().ref().child(value.userUid).remove();
                                    this.componentDidMount();
                                }} className="btn btn-danger mt-lg-0 mt-md-0 mt-3 text-uppercase">Delete Profile</button>
                            </View>
                        </View>
                    </View>
                </View>
            )
        })

        // Create Student List
        let studentList = this.state.studentArray.map((value) => {
            return (
                <View key={value.userUid}>
                    <View className="col-lg-11 col-md-11 p-3 mx-auto border border-bottom-0 border-primary">
                        <Text className="h3 text-dark mb-3">{value.userFullName}</Text>
                        <Paragraph className="text-secondary"><Text>{value.userQualification}</Text><Text className="ml-3">{value.userLocation}</Text></Paragraph>
                        <Paragraph>{value.userBio}</Paragraph>
                    </View>
                    <View className="col-lg-11 col-md-11 py-2 mb-3 mx-auto border border-primary">
                        <View className="row">
                            <View className="col-lg-6 col-md-6">
                                <Text className="far fa-envelope text-primary mr-2"></Text><Text>{value.userEmail}</Text>
                            </View>
                            <View className="col-lg-6 col-md-6 text-lg-right text-md-right">
                                <button type="button" onClick={() => {
                                    firebaseconfig.database().ref().child(value.userUid).remove();
                                    this.componentDidMount();
                                }} className="btn btn-danger mt-lg-0 mt-md-0 mt-3 text-uppercase">Delete Profile</button>
                            </View>
                        </View>
                    </View>
                </View>
            )
        })

        return (
            <View>
                <View className="col-11 mx-auto py-4 px-lg-5 px-md-5 mt-5 mb-4 bg-white shadow border border-primary">
                    <View className="row">
                        <View className="col-lg-6 col-md-6">
                            <Text className="h2 text-uppercase text-dark">Admin dashboard</Text>
                        </View>
                        <View className="col-lg-6 col-md-6 text-right">
                            <button type="button" onClick={this.logOut} className="btn btn-success text-uppercase px-4 m-2">Log Out</button>
                        </View>
                    </View>
                </View>
                <View id="myNavbar" className="col-11 mx-auto my-4 bg-white shadow border border-primary">
                    <Unorderedlist className="list-inline m-3">
                        <ListView className="list-inline-item px-3 border-right border-primary">
                            <input type="radio" id="jobList" name="showOtherDivs" value="jobList" checked={this.state.showOtherDivs["jobList"]} onChange={this.showOtherDivsHandler} />
                            <label className="myNavbarItems m-0" htmlFor="jobList"><strong>Job List</strong></label>
                        </ListView>
                        <ListView className="list-inline-item px-3 border-right border-primary">
                            <input type="radio" id="companyList" name="showOtherDivs" value="companyList" checked={this.state.showOtherDivs["companyList"]} onChange={this.showOtherDivsHandler} />
                            <label className="myNavbarItems m-0" htmlFor="companyList"><strong>Company List</strong></label>
                        </ListView>
                        <ListView className="list-inline-item px-3">
                            <input type="radio" id="studentList" name="showOtherDivs" value="studentList" checked={this.state.showOtherDivs["studentList"]} onChange={this.showOtherDivsHandler} />
                            <label className="myNavbarItems m-0" htmlFor="studentList"><strong>Student List</strong></label>
                        </ListView>
                    </Unorderedlist>
                </View>
                {this.state.showOtherDivs.jobList ?
                    <View>
                        <View className="col-11 pt-4 pb-5 px-lg-5 px-md-5 mx-auto my-4 bg-white shadow border border-primary">
                            <Text className="h2 text-center text-dark mb-4">Job List</Text>
                            {jobList}
                        </View>
                    </View> :
                    this.state.showOtherDivs.companyList ?
                        <View>
                            <View className="col-11 pt-4 pb-5 px-lg-5 px-md-5 mx-auto my-4 bg-white shadow border border-primary">
                                <Text className="h2 text-center text-dark mb-4">Company List</Text>
                                {companyList}
                            </View>
                        </View> :
                        this.state.showOtherDivs.studentList ?
                            <View>
                                <View className="col-11 pt-4 pb-5 px-lg-5 px-md-5 mx-auto my-4 bg-white shadow border border-primary">
                                    <Text className="h2 text-center text-dark mb-4">Student List</Text>
                                    {studentList}
                                </View>
                            </View> : null
                }
            </View>
        )
    }
}
export default Admindashboard;
