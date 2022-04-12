import React from 'react';
import {
  Heading,
  Box,
  Pressable
} from 'native-base';

const XLSXPickerButton = ({ onPress }) => {
    return (
        <Pressable onPress={ onPress }>
            <Box width="100%" bg={{
                linearGradient: {
                colors: ["lightBlue.300", "violet.800"],
                start: [0, 0],
                end: [1, 0]
                }
            }} p="12" rounded="xl" _text={{
                fontSize: "md",
                fontWeight: "medium",
                color: "white",
                textAlign: "center"
            }} shadow={5}>
                <Heading size="lg" color={"white"}>Select the employee list from your phone storage</Heading>
            </Box>
        </Pressable>
    );
  };
  export default XLSXPickerButton;