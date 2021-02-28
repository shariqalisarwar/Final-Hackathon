import React, { Component } from 'react';
import './Bootstrap.min.css';
import './Companydashboard.css';
import firebaseconfig from './Firebaseconfig';
import swal from 'sweetalert2';
import HTML from 'react-native-render-html';
import { Text, View } from 'react-native';
import { Unorderedlist, ListView } from 'react-native-unordered-list';
import { Paragraph } from 'react-native-paper';
import { TouchableOpacity, Linking } from "react-native";

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
// import { faBuilding } from '@fortawesome/free-solid-svg-icons'

// library.add(faBuilding)


class Companydashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userFullName: "",
            userLocation: "",
            userIndustry: "",
            userEmployees: "",
            userFounded: "",
            userFb: "",
            userTw: "",
            userGp: "",
            userSite: "",
            userBio: "",
            userData: {},
            showEditForm: false,
            showOtherDivs: {
                myJobs: true,
                postNewJobs: false,
                studentsList: false,
            },
            jobTitle: "",
            jobLocation: "",
            jobSalary: "",
            jobDescription: "",
            jobsArray: [],
            studentArray: [],
        }
        // Log Out Handler 
        this.logOut = this.logOut.bind(this);
        // Edit Profile Handlers
        this.showEditFormHandler = this.showEditFormHandler.bind(this);
        this.hideEditFormHandler = this.hideEditFormHandler.bind(this);
        this.saveEditFormHandler = this.saveEditFormHandler.bind(this);
        this.userFullNameHandler = this.userFullNameHandler.bind(this);
        this.userLocationHandler = this.userLocationHandler.bind(this);
        this.userIndustryHandler = this.userIndustryHandler.bind(this);
        this.userEmployeesHandler = this.userEmployeesHandler.bind(this);
        this.userFoundedHandler = this.userFoundedHandler.bind(this);
        this.userFbHandler = this.userFbHandler.bind(this);
        this.userTwHandler = this.userTwHandler.bind(this);
        this.userGpHandler = this.userGpHandler.bind(this);
        this.userSiteHandler = this.userSiteHandler.bind(this);
        this.userBioHandler = this.userBioHandler.bind(this);
        this.showOtherDivsHandler = this.showOtherDivsHandler.bind(this);
        // Post New Job Handlers
        this.jobTitleHandler = this.jobTitleHandler.bind(this);
        this.jobLocationHandler = this.jobLocationHandler.bind(this);
        this.jobSalaryHandler = this.jobSalaryHandler.bind(this);
        this.jobDescriptionHandler = this.jobDescriptionHandler.bind(this);
        this.jobPostingHandler = this.jobPostingHandler.bind(this);
    }

    componentDidMount() {
        let jobsArray = [];
        let studentArray = [];
        let userData;
        var that = this;
        firebaseconfig.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid;
                let firebaseRefKey = firebaseconfig.database().ref().child(uid);
                firebaseRefKey.on('value', (dataSnapShot) => {
                    userData = dataSnapShot.val();
                    // userData.uid = uid;
                    that.setState({
                        userData: userData,
                    })
                })
                let jobRefKey = firebaseconfig.database().ref().child(uid).child('jobs');
                if(jobRefKey !== null){
                    jobRefKey.once('value', (dataSnapShot) => {
                        for(let key in dataSnapShot.val()){
                            jobsArray.push(dataSnapShot.val()[key])
                        }
                    })
                    that.setState({
                        jobsArray: jobsArray,
                    })
                }
                let studentRefKey = firebaseconfig.database().ref();
                studentRefKey.once('value', (dataSnapShot) => {
                    for(let key in dataSnapShot.val()){
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
    userIndustryHandler(event) {
        this.setState({
            userIndustry: event.target.value,
        })
    }
    userEmployeesHandler(event) {
        this.setState({
            userEmployees: event.target.value,
        })
    }
    userFoundedHandler(event) {
        this.setState({
            userFounded: event.target.value,
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
                    userData.userIndustry = that.state.userIndustry;
                    userData.userEmployees = that.state.userEmployees;
                    userData.userFounded = that.state.userFounded;
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

    jobTitleHandler(event) {
        this.setState({
            jobTitle: event.target.value,
        })
    }
    jobLocationHandler(event) {
        this.setState({
            jobLocation: event.target.value,
        })
    }
    jobSalaryHandler(event) {
        this.setState({
            jobSalary: event.target.value,
        })
    }
    jobDescriptionHandler(event) {
        this.setState({
            jobDescription: event.target.value,
        })
    }
    jobPostingHandler(event) {
        let currentDate = new Date().toDateString()
        let myJobs = {
            jobTitle: this.state.jobTitle,
            companyName: this.state.userData.userFullName,
            companyEmail: this.state.userData.userEmail,
            jobLocation: this.state.jobLocation,
            jobSalary: this.state.jobSalary,
            jobDescription: this.state.jobDescription,
            jobPostDate: currentDate,
        }
        let userData;
        let that = this;
        firebaseconfig.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid;
                // firebaseconfig.database().ref().child(uid).child("jobs").push(myJobs);
                let pushKey = firebaseconfig.database().ref().child(uid).child("jobs").push().getKey();
                myJobs.jobUid = pushKey;
                myJobs.companyUid = user.uid;
                firebaseconfig.database().ref().child(uid).child("jobs").child(pushKey).set(myJobs)
                let firebaseRefKey = firebaseconfig.database().ref().child(uid);
                firebaseRefKey.on('value', (dataSnapShot) => {
                    userData = dataSnapShot.val();
                    that.setState({
                        userData: userData,
                    })
                })
                swal({
                    type: 'success',
                    title: 'Successfully Posted',
                    text: 'Job has been successfully posted',
                }).then((value) => {
                    that.setState({
                        showOtherDivs: {
                            myJobs: true,
                            postNewJobs: false,
                            studentsList: false,
                        }
                    })
                });
            } else {
                console.log("User is not logged in")
            }
        });
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

        let myJobItems = this.state.jobsArray.map((value) => {
            return(
                <View key={value.jobUid}>
                    <View className="col-lg-11 col-md-11 p-3 mx-auto border border-bottom-0 border-primary">
                        <Text className="h3 text-dark mb-3">{value.jobTitle}</Text>
                        <Paragraph className="text-secondary"><Text>{value.companyName}</Text><Text className="ml-3">{value.jobLocation}</Text></Paragraph>
                        <Paragraph>{value.jobDescription}</Paragraph>
                    </View>
                    <View className="col-lg-11 col-md-11 py-2 mb-3 mx-auto border border-primary">
                        
                        <Text className="far fa-calendar-alt text-primary mr-2"></Text><span>{value.jobPostDate}</span>
                        <Text className="fas fa-dollar-sign text-primary ml-3 mr-2"></Text><span>{value.jobSalary}</span>
                        
                    </View>
                </View>
            )
        })

        let studentList = this.state.studentArray.map((value) => {
            return(
                <View key={value.userUid}>
                    <View className="col-lg-11 col-md-11 p-3 mx-auto border border-bottom-0 border-primary">
                        <Text className="h3 text-dark mb-3">{value.userFullName}</Text>
                        <Paragraph className="text-secondary"><Text>{value.userQualification}</Text><Text className="ml-3">{value.userLocation}</Text></Paragraph>
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
                                <label htmlFor="userIndustry">Industry</label>
                                <input type="text" value={this.state.userIndustry} onChange={this.userIndustryHandler} className="form-control" id="userIndustry" placeholder="Information Technology" />
                            </View>
                            <View className="form-group">
                                <label htmlFor="userLocation">Location</label>
                                <input type="text" value={this.state.userLocation} onChange={this.userLocationHandler} className="form-control" id="userLocation" placeholder="City, Country" />
                            </View>
                            <View className="form-group">
                                <label htmlFor="userEmployees">Employees</label>
                                <input type="number" value={this.state.userEmployees} onChange={this.userEmployeesHandler} className="form-control" id="userEmployees" placeholder="No of Employees" />
                            </View>
                            <View className="form-group">
                                <label htmlFor="userFounded">Founded</label>
                                <input type="number" value={this.state.userFounded} onChange={this.userFoundedHandler} className="form-control" id="userFounded" placeholder="2015" />
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
                                            <Text className="display-2 text-primary far fa-building"></Text>
                                            
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
                                                    <th className="pb-2">Industry:</th>
                                                    <td className="pl-lg-5 pl-md-5 pl-3 pb-2">{this.state.userData.userIndustry}</td>
                                                </tr>
                                                <tr>
                                                    <th className="pb-2">Location:</th>
                                                    <td className="pl-lg-5 pl-md-5 pl-3 pb-2">{this.state.userData.userLocation}</td>
                                                </tr>
                                                <tr>
                                                    <th className="pb-2">Employees:</th>
                                                    <td className="pl-lg-5 pl-md-5 pl-3 pb-2">{this.state.userData.userEmployees}</td>
                                                </tr>
                                                <tr>
                                                    <th className="pb-2">Founded:</th>
                                                    <td className="pl-lg-5 pl-md-5 pl-3 pb-2">{this.state.userData.userFounded}</td>
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
                                <ListView className="list-inline-item px-3 border-right border-primary">
                                    <input type="radio" id="myJobs" name="showOtherDivs" value="myJobs" checked={this.state.showOtherDivs["myJobs"]} onChange={this.showOtherDivsHandler}/>
                                    <label className="myNavbarItems m-0" htmlFor="myJobs"><strong>My Jobs</strong></label>
                                </ListView>
                                <ListView className="list-inline-item px-3 border-right border-primary">
                                    <input type="radio" id="postNewJobs" name="showOtherDivs" value="postNewJobs" checked={this.state.showOtherDivs["postNewJobs"]} onChange={this.showOtherDivsHandler}/>
                                    <label className="myNavbarItems m-0" htmlFor="postNewJobs"><strong>Post New Job</strong></label>
                                </ListView>
                                <ListView className="list-inline-item px-3">
                                    <input type="radio" id="studentsList" name="showOtherDivs" value="studentsList" checked={this.state.showOtherDivs["studentsList"]} onChange={this.showOtherDivsHandler}/>
                                    <label className="myNavbarItems m-0" htmlFor="studentsList"><strong>Students List</strong></label>
                                </ListView>
                            </ Unorderedlist>
                        </View>
                        {this.state.showOtherDivs.myJobs ?
                            <View>
                                <View className="col-11 pt-4 pb-5 px-lg-5 px-md-5 mx-auto my-4 bg-white shadow border border-primary">
                                    <Text className="h2 text-center text-dark mb-4">My Jobs</Text>
                                    {myJobItems}
                                </View>
                            </View> :
                        this.state.showOtherDivs.postNewJobs ?
                            <View>
                                <View className="col-11 py-4 px-lg-5 px-md-5 mx-auto my-4 bg-white shadow border border-primary">
                                    <Text className="h2 text-center text-dark mb-3">Post New Jobs</Text>
                                    <View className="form-group">
                                        <label htmlFor="jobTitle">Job Title</label>
                                        <input type="text" value={this.state.jobTitle} onChange={this.jobTitleHandler} className="form-control" id="jobTitle" placeholder="Job Title/ Job Position" />
                                    </View>
                                    <View className="form-group">
                                        <label htmlFor="jobLocation">Location</label>
                                        <input type="text" value={this.state.jobLocation} onChange={this.jobLocationHandler} className="form-control" id="jobLocation" placeholder="City, Country" />
                                    </View>
                                    <View className="form-group">
                                        <label htmlFor="jobSalary">Salary</label>
                                        <input type="number" value={this.state.jobSalary} onChange={this.jobSalaryHandler} className="form-control" id="jobSalary" placeholder="25000" />
                                    </View>
                                    <View className="form-group">
                                        <label htmlFor="jobDescription">Job Description</label>
                                        <textarea value={this.state.jobDescription} onChange={this.jobDescriptionHandler} className="form-control" id="userBio" rows="4"></textarea>
                                    </View>
                                    <View className="col-lg-6 col-md-6 mx-auto mt-3">
                                        <button type="button" className="btn btn-success btn-block text-uppercase mb-3" onClick={this.jobPostingHandler}>Publish</button>
                                    </View>
                                </View>
                            </View> :
                        this.state.showOtherDivs.studentsList ?
                            <View>

                                <View className="col-11 pt-4 pb-5 px-lg-5 px-md-5 mx-auto my-4 bg-white shadow border border-primary">
                                    <Text className="h2 text-center text-dark mb-4">Students List</Text>
                                    {studentList}                                
                                </View>
                            </View> : null
                        }


                    </View>
                }
            </View>
        )
    }
}
export default Companydashboard;
