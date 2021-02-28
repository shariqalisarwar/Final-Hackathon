import React, { Component } from 'react';
import './App.css';
import './Bootstrap.min.css';
import MyRoutes from './Routes';
import {Text,View} from 'react-native';


class App extends Component {

  render() {
    return (
      <View className="App">
        <View className="container-fluid">
          <MyRoutes />          
        </View>
      </View>
    );
  }
}

export default App;
