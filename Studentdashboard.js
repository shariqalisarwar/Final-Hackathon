import React, { Component } from 'react';
import './Bootstrap.min.css';
import './Studentdashboard.css';
import firebaseconfig from './Firebaseconfig';
import swal from 'sweetalert2';
import { Text, View } from 'react-native';
import { Unorderedlist, ListView } from 'react-native-unordered-list';
import { Paragraph } from 'react-native-paper';
import { TouchableOpacity, Linking } from "react-native";

class Studentdashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userFullName: "",
            userLocation: "",
            userQualification: "",
            userPercentage: "",
            userPassingYear: "",
            userFb: "",
            userTw: "",
            userGp: "",
            userSite: "",
            userBio: "",
            userData: {},
            showEditForm: false,
            showOtherDivs: {
                jobList: true,
                companyList: false,
            },
            jobsArray: [],
            companyArray: [],
        }
        // Log Out Handler 
        this.logOut = this.logOut.bind(this);
        // Edit Profile Handlers
        this.showEditFormHandler = this.showEditFormHandler.bind(this);
        this.hideEditFormHandler = this.hideEditFormHandler.bind(this);
        this.saveEditFormHandler = this.saveEditFormHandler.bind(this);
        this.userFullNameHandler = this.userFullNameHandler.bind(this);
        this.userLocationHandler = this.userLocationHandler.bind(this);
        this.userQualificationHandler = this.userQualificationHandler.bind(this);
        this.userPercentageHandler = this.userPercentageHandler.bind(this);
        this.userPassingYearHandler = this.userPassingYearHandler.bind(this);
        this.userFbHandler = this.userFbHandler.bind(this);
        this.userTwHandler = this.userTwHandler.bind(this);
        this.userGpHandler = this.userGpHandler.bind(this);
        this.userSiteHandler = this.userSiteHandler.bind(this);
        this.userBioHandler = this.userBioHandler.bind(this);
        this.showOtherDivsHandler = this.showOtherDivsHandler.bind(this);
    }

    componentDidMount() {
        let jobsArray = [];
        let companyArray = [];
        let userData;
        var that = this;
        firebaseconfig.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid;
                let firebaseRefKey = firebaseconfig.database().ref().child(uid);
                firebaseRefKey.on('value', (dataSnapShot) => {
                    userData = dataSnapShot.val();
                    // userData.uid = uid;
                    // console.log(userData);
                    // console.log(userData.uid);
                    that.setState({
                        userData: userData,
                    })
                })
                let jobRefKey = firebaseconfig.database().ref();

                jobRefKey.once('value', (dataSnapShot) => {
                    for(let key1 in dataSnapShot.val()){
                        if(dataSnapShot.val()[key1].jobs !== undefined){
                            for(let key2 in dataSnapShot.val()[key1].jobs){
                                dataSnapShot.val()[key1].jobs[key2].companyEmail = dataSnapShot.val()[key1].userEmail;
                                jobsArray.push(dataSnapShot.val()[key1].jobs[key2]);                                
                                // console.log(dataSnapShot.val()[key1].jobs[key2]);
                            }
                        }
                    }
                    that.setState({
                        jobsArray: jobsArray,
                    })
                    // console.log(jobsArray.companyEmail)
                })
                
                let companyRefKey = firebaseconfig.database().ref();
                companyRefKey.once('value', (dataSnapShot) => {
                    // console.log(dataSnapShot.val());
                    for(let key in dataSnapShot.val()){
                        if (dataSnapShot.val()[key].userStatus.company === true) {
                            companyArray.push(dataSnapShot.val()[key])
                        }
                    }
                    that.setState({
                        companyArray: companyArray,
                    })
                    // console.log(companyArray)
                })
            } else {
                console.log("User is not logged in")
            }
        });
    }

    userFullNameHandler(event) {
        this.setState({
            userFullName: event.target.value,
        })
    }
    userLocationHandler(event) {
        this.setState({
            userLocation: event.target.value,
        })
    }
    userQualificationHandler(event) {
        this.setState({
            userQualification: event.target.value,
        })
    }
    userPercentageHandler(event) {
        this.setState({
            userPercentage: event.target.value,
        })
    }
    userPassingYearHandler(event) {
        this.setState({
            userPassingYear: event.target.value,
        })
    }
    userFbHandler(event) {
        this.setState({
            userFb: event.target.value,
        })
    }
    userTwHandler(event) {
        this.setState({
            userTw: event.target.value,
        })
    }
    userGpHandler(event) {
        this.setState({
            userGp: event.target.value,
        })
    }
    userSiteHandler(event) {
        this.setState({
            userSite: event.target.value,
        })
    }
    userBioHandler(event) {
        this.setState({
            userBio: event.target.value,
        })
    }
    showEditFormHandler() {
        if (this.state.showEditForm === false) {
            this.setState({
                showEditForm: true,
            })
        }
    }
    hideEditFormHandler() {
        if (this.state.showEditForm === true) {
            this.setState({
                showEditForm: false,
            })
        }
    }

    saveEditFormHandler() {
        let userData;
        var that = this;
        firebaseconfig.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid;
                let firebaseRefKey = firebaseconfig.database().ref().child(uid);
                firebaseRefKey.on('value', (dataSnapShot) => {
                    userData = dataSnapShot.val();
                    userData.userFullName = that.state.userFullName;
                    userData.userLocation = that.state.userLocation;
                    userData.userQualification = that.state.userQualification;
                    userData.userPercentage = that.state.userPercentage;
                    userData.userPassingYear = that.state.userPassingYear;
                    userData.userFb = that.state.userFb;
                    userData.userTw = that.state.userTw;
                    userData.userGp = that.state.userGp;
                    userData.userSite = that.state.userSite;
                    userData.userBio = that.state.userBio;
                    that.setState({
                        userData: userData,
                    })
                })
                firebaseRefKey.set(that.state.userData)
                swal({
                    type: 'success',
                    title: 'Successfully Updated',
                    text: 'Profile has been successfully updated',
                }).then((value) => {
                    that.setState({
                        showEditForm: false,
                    })
                });
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

        let jobList = this.state.jobsArray.map((value) => {
            return(
                <View key={value.jobUid}>
                    <View className="col-lg-11 col-md-11 p-3 mx-auto border border-bottom-0 border-primary">
                        <Text className="h3 text-dark mb-3">{value.jobTitle}</Text>
                        <View id="jobDetails">
                            <Paragraph className="text-secondary mb-0"><span>{value.companyName}</span>,<span className="ml-3">{value.jobLocation}</span></Paragraph>
                            <Paragraph className="text-secondary"><Text>Apply Now:</Text><Text className="ml-3">{value.companyEmail}</Text></Paragraph>
                        </View>
                        <Paragraph>{value.jobDescription}</Paragraph>
                    </View>
                    <View className="col-lg-11 col-md-11 py-2 mb-3 mx-auto border border-primary">
                     
                        <Text className="far fa-calendar-alt text-primary mr-2"></Text><Text>{value.jobPostDate}</Text>
                        <Text className="fas fa-dollar-sign text-primary ml-3 mr-2"></Text><Text>{value.jobSalary}</Text>
                      
                    </View>
                </View>
            )
        })

        // console.log(this.state.companyArray);
        let companyList = this.state.companyArray.map((value) => {
            return(
                <View key={value.userUid}>
                    <View className="col-lg-11 col-md-11 p-3 mx-auto border border-bottom-0 border-primary">
                        <Text className="h3 text-dark mb-3">{value.userFullName}</Text>
                        <Paragraph className="text-secondary"><Text>{value.userIndustry}</Text><Text className="ml-3">{value.userLocation}</Text></Paragraph>
                        <Paragraph>{value.userBio}</Paragraph>
                    </View>
                    <View className="col-lg-11 col-md-11 py-2 mb-3 mx-auto border border-primary">
                    
                            <Text className="far fa-envelope text-primary mr-2"></Text><Text>{value.userEmail}</Text>
                      
                    </View>
                </View>
            )
        })
        return (
            <View>
                {this.state.showEditForm ?
                    <View className="col-11 mx-auto py-4 px-lg-5 px-md-5 my-5 bg-white shadow border border-primary">
                        <View className="col-lg-6 col-md-6 mx-auto">
                            <Text className="h2 text-center text-dark mb-3">Edit Profile</Text>
                            <View className="form-group">
                                <label htmlFor="userFullName">Full name</label>
                                <input type="text" value={this.state.userFullName} onChange={this.userFullNameHandler} className="form-control" id="userFullName" placeholder="Name" />
                            </View>
                            <View className="form-group">
                                <label htmlFor="userLocation">Location</label>
                                <input type="text" value={this.state.userLocation} onChange={this.userLocationHandler} className="form-control" id="userLocation" placeholder="City, Country" />
                            </View>
                            <View className="form-group">
                                <label htmlFor="userQualification">Qualification</label>
                                <input type="text" value={this.state.userQualification} onChange={this.userQualificationHandler} className="form-control" id="userQualification" placeholder="Bachelor Of Computer Science"/>
                            </View>
                            <View className="form-group">
                                <label htmlFor="userPassingYear">Passing Year</label>
                                <input type="number" value={this.state.userPassingYear} onChange={this.userPassingYearHandler} className="form-control" id="userPassingYear" placeholder="2015" />
                            </View>
                            <View className="form-group">
                                <label htmlFor="userPercentage">Percentage</label>
                                <input type="number" value={this.state.userPercentage} onChange={this.userPercentageHandler} className="form-control" id="userPercentage" placeholder="50%" />
                            </View>
                            <View className="form-group">
                                <label htmlFor="userFacebook">Facebook</label>
                                <input type="text" value={this.state.userFb} onChange={this.userFbHandler} className="form-control" id="userFacebook" placeholder="https://www.facebook.com/" />
                            </View>
                            <View className="form-group">
                                <label htmlFor="userTwitter">Twitter</label>
                                <input type="text" value={this.state.userTw} onChange={this.userTwHandler} className="form-control" id="userTwitter" placeholder="https://www.twitter.com/" />
                            </View>
                            <View className="form-group">
                                <label htmlFor="userGooglePlus">Google Plus</label>
                                <input type="text" value={this.state.userGp} onChange={this.userGpHandler} className="form-control" id="userGooglePlus" placeholder="https://plus.google.com/" />
                            </View>
                            <View className="form-group">
                                <label htmlFor="userSite">Website</label>
                                <input type="text" value={this.state.userSite} onChange={this.userSiteHandler} className="form-control" id="userSite" placeholder="https://www.example.com/" />
                            </View>
                            <View className="form-group">
                                <label htmlFor="userBio">Profile Description</label>
                                <textarea value={this.state.userBio} onChange={this.userBioHandler} className="form-control" id="userBio" rows="4"></textarea>
                            </View>
                            <button type="button" className="btn btn-success btn-block text-uppercase mb-3" onClick={this.saveEditFormHandler}>Save Profile</button>
                            <button type="button" className="btn btn-outline-danger btn-block text-uppercase" onClick={this.hideEditFormHandler}>Cancle</button>
                        </View>
                    </View>
                    :
                    <View>
                        <View className="col-11 mx-auto my-4 bg-white shadow border border-primary">
                            <View className="row">
                                <View className="col-lg-8 col-md-8 pt-3 py-lg-3 py-md-3 px-lg-5 px-md-5">
                                    <View className="row">
                                        <View className="col-lg-2 col-md-2 my-lg-4 text-center">
                                            <Text className="fas fa-user-graduate graduate-logo text-primary"></Text>
                                        </View>
                                        <View className="col-lg-10 col-md-10 my-4">
                                            <Text className="">{this.state.userData.userFullName}</Text>
                                            <Paragraph>{this.state.userData.userBio}</Paragraph>
                                            <button type="button" onClick={this.showEditFormHandler} className="btn btn-success mr-3 text-uppercase">Edit Profile</button>
                                            <button type="button" onClick={this.logOut} className="btn btn-outline-danger text-uppercase">Log Out</button>
                                        </View>
                                    </View>
                                </View>
                                <View className="col-lg-4 col-md-4 py-lg-3 py-md-3">
                                    <View className="my-4 pl-4 border-left">
                                        <table>
                                                                                          <tr>
                                                    <th className="pb-2">Location:</th>
                                                    <td className="pl-lg-5 pl-md-5 pl-3 pb-2">{this.state.userData.userLocation}</td>
                                                </tr>
                                                <tr>
                                                    <th className="pb-2">Qualification:</th>
                                                    <td className="pl-lg-5 pl-md-5 pl-3 pb-2">{this.state.userData.userQualification}</td>
                                                </tr>
                                                <tr>
                                                    <th className="pb-2">Percentage:</th>
                                                    <td className="pl-lg-5 pl-md-5 pl-3 pb-2">{this.state.userData.userPercentage}</td>
                                                </tr>
                                                <tr>
                                                    <th className="pb-2">Passing Year:</th>
                                                    <td className="pl-lg-5 pl-md-5 pl-3 pb-2">{this.state.userData.userPassingYear}</td>
                                                </tr>
                                           
                                        </table>
                                        <View className="my-4">
                                        <TouchableOpacity onPress={() => Linking.openURL('http://Facebook.com')}>
                                        <Text> Facebook </Text>     
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => Linking.openURL('http://Twitter.com')}>
                                        <Text> Twitter </Text>     
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => Linking.openURL('http://Gmail.com')}>
                                        <Text> Gmail </Text>     
                                        </TouchableOpacity>
                                             </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View id="myNavbar" className="col-11 mx-auto my-4 bg-white shadow border border-primary">
                            <Unorderedlist className="list-inline m-3">
                                <ListView  className="list-inline-item px-3 border-right border-primary">
                                    <input type="radio" id="jobList" name="showOtherDivs" value="jobList" checked={this.state.showOtherDivs["jobList"]} onChange={this.showOtherDivsHandler}/>
                                    <label className="myNavbarItems m-0" htmlFor="jobList"><strong>Job List</strong></label>
                                </ListView >
                                <ListView  className="list-inline-item px-3">
                                    <input type="radio" id="companyList" name="showOtherDivs" value="companyList" checked={this.state.showOtherDivs["companyList"]} onChange={this.showOtherDivsHandler}/>
                                    <label className="myNavbarItems m-0" htmlFor="companyList"><strong>Company List</strong></label>
                                </ListView >
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
                                    <Text className="h2 text-center text-dark mb-4">Companies List</Text>
                                    {companyList}                                
                                </View>
                            </View> : null
                        }


                    </View>
                }
            </View>
        )
    }
}
export default Studentdashboard;
