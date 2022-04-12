import React from 'react';
import {
  Heading,
  Box,
  Pressable
} from 'native-base';

const ClearSessionButton = ({ onPress }) => {

    return (
        <Pressable onPress={ onPress }>
            <Box width="100%" bg={{
                linearGradient: {
                colors: ["rose.400", "error.800"],
                start: [0, 0],
                end: [1, 0]
                }
            }} p="12" rounded="xl" _text={{
                fontSize: "md",
                fontWeight: "medium",
                color: "white",
                textAlign: "center"
            }} shadow={5}>
                <Heading size="lg" color={"white"}>Finish evacuation</Heading>
            </Box>
        </Pressable>
    );
  };
  export default ClearSessionButton;