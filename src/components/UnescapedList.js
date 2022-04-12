import React, { useState, useEffect } from 'react';
import { getUnescaped } from '../util/DataStorageUtil';
import {
    NativeBaseProvider,
    VStack,
    Box,
    Spinner,
    HStack,
    Center,
    Flex,
    Divider
} from 'native-base';
import { 
    ScrollView
} from "react-native";

const UnescapedList = () => {

    const [unescaped, setUnescaped] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getUnescaped()
          .then((data) => {
            setUnescaped(data);
            setIsLoading(false);
          });
    }, []);

    const renderColumns = (data) => {
        return (
          <HStack space={8} justifyContent="flex-start">
            <Flex direction="row">
              <Center> { data["Employee ID"] } </Center>
              <Divider bg="rgba(0,0,0,0)" thickness="2" mx="2" orientation="vertical" />
              <Center> { data["Employee name"] } </Center>
            </Flex>
          </HStack>
        );
    }

    return (
        <NativeBaseProvider>
            <Box
                px={2}
                flex={1}>
                <ScrollView>
                    <VStack space={0} alignItems="stretch" mt={2}>
                        { isLoading && <HStack space={8} mt="50%" justifyContent="center" alignItems="center"><Spinner size="lg" /></HStack> }
                        { !isLoading && unescaped.map((emp) => { return renderColumns(emp);}) }
                    </VStack>
                </ScrollView>
            </Box>
        </NativeBaseProvider>
    );

} 

export default UnescapedList;