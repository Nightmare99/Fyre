import React, { useState, useEffect } from 'react';
import {
  NativeBaseProvider,
  VStack,
  Box,
  Heading,
  Spinner
} from 'native-base';

import { 
  PermissionsAndroid
} from "react-native";
import XLSXPickerButton from '../components/XLSXPickerButton';
import { getData, resetStorage, storeData } from '../util/DataStorageUtil';
import QRScannerButton from '../components/QRScannerButton';
import ClearSessionButton from '../components/ClearSessionButton';
import CheckStatusButton from '../components/CheckStatusButton';
import FilePickerManager from 'react-native-file-picker';
import XLSX from 'xlsx';
import { readFile } from 'react-native-fs';
const config = {
    dependencies: {
      "linear-gradient": require("react-native-linear-gradient").default,
    },
};

const getPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: 'External Storage Write Permission',
      message: 'App needs access to local storage',
      buttonNegative: "Cancel",
      buttonPositive: "OK"
    }
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log("Perms granted");
  } else console.log("Perms not granted");
}

const HomeScreen = ({ navigation }) => {

  getPermission();

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getData("@Data_Loaded_Flag")
      .then((flag) => {
        if (flag) setIsDataLoaded(flag);
        else setIsDataLoaded(false);
        setIsLoading(false);
        //console.log(isLoading);
        console.log(isDataLoaded);
      });
  }, [isDataLoaded]);

  const clearData = async () => {
    try {
      await resetStorage();
      setIsDataLoaded(false);
    } catch (e) {
      console.error(e);
    }
  }

  const pickFile = () => {
    FilePickerManager.showFilePicker(null, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled file picker');
      }
      else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      }
      else {
        console.log(response.path);
        readFile(response.path, 'ascii')
          .then(async (res) => {
            const wb = XLSX.read(res, {type: 'binary'});
            var sheetName = wb.SheetNames[0];
            var ws = wb.Sheets[sheetName];
            var jsa = XLSX.utils.sheet_to_json(ws);
            jsa.forEach(async (emp) => {
              emp["escaped"] = false;
              await storeData(`@${emp["Employee ID"]}`, emp);
            });
            await storeData("@Data_Loaded_Flag", true);
            setIsDataLoaded(true);
          })
          .catch((err) => console.log(err));
      }
    });
  }
  
  return (
    <NativeBaseProvider config={config}>
      <Box
        _dark={{bg: 'blueGray.900'}}
        _light={{bg: 'blueGray.50'}}
        px={4}
        flex={1}>
        <VStack space={5} alignItems="center" mt={3}>
            { isLoading && <Spinner size="lg" /> }
            { !isLoading && !isDataLoaded && <XLSXPickerButton onPress={ () => pickFile()} /> } 
            { !isLoading && isDataLoaded && <QRScannerButton onPress={ () => navigation.navigate('Scanner') } /> }
            { !isLoading && isDataLoaded && <CheckStatusButton onPress={ () => navigation.navigate('Status') } /> }
            { !isLoading && isDataLoaded && <ClearSessionButton onPress = { async () => clearData()}/> }
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};
export default HomeScreen;