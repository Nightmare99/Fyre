'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity, 
  ToastAndroid
} from 'react-native';

import {
  Heading,
  Link,
  NativeBaseProvider
} from 'native-base';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { getUnescaped, markSafe } from '../util/DataStorageUtil';

export default class ScanScreen extends Component {
  onSuccess = async (e) => {
    console.log(e.data);
    const data = JSON.parse(e.data);
    const empID = data["Employee ID"];
    const emp = await markSafe(`@${empID}`);
    ToastAndroid.show(`${emp["Employee name"]} is marked safe.`, ToastAndroid.SHORT);
    // Sample data: {
    //   "Employee ID": "CH273",
    //   "Employee name": "Sathishkumar" 
    // }
  };

  render() {
    return (
      <NativeBaseProvider>
        <QRCodeScanner
          onRead={this.onSuccess}
          ref={(node) => { this.scanner = node }}
          showMarker={true}
          reactivate={true}
          reactivateTimeout={1000}
        />
      </NativeBaseProvider>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});
