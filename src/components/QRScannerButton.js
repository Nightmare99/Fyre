import React from 'react';
import {
  Heading,
  Box,
  Pressable
} from 'native-base';
import { useNavigation } from '@react-navigation/native';

const QRScannerButton = ({ onPress }) => {
  
    const navigation = useNavigation();

    return (
        <Pressable onPress={ onPress }>
            <Box width="100%" bg={{
                linearGradient: {
                colors: ["fuchsia.300", "purple.800"],
                start: [0, 0],
                end: [1, 0]
                }
            }} p="12" rounded="xl" _text={{
                fontSize: "md",
                fontWeight: "medium",
                color: "white",
                textAlign: "center"
            }} shadow={5}>
                <Heading size="lg" color={"white"}>Scan employee ID card to mark them as safe</Heading>
            </Box>
        </Pressable>
    );
  };
  export default QRScannerButton;