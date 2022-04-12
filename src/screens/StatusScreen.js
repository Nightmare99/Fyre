import React, { useState, useEffect } from 'react';
import {
  useWindowDimensions
} from "react-native";
import { getEscaped } from '../util/DataStorageUtil';
import { TabView, SceneMap } from 'react-native-tab-view';
import UnescapedList from '../components/UnescapedList';
import EscapedList from '../components/EscapedList';

const StatusScreen = () => {

  const layout = useWindowDimensions();

  useEffect(() => {
    getEscaped()
      .then((data) => {
        setEscaped(data);
      });
  }, []);

  const UnescapedRoute = () => {
    return <UnescapedList />;
  }

  const EscapedRoute = () => {
    return <EscapedList />;
  }

  const renderScene = SceneMap({
    unescaped: UnescapedRoute,
    escaped: EscapedRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'unescaped', title: 'Unescaped' },
    { key: 'escaped', title: 'Escaped' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};
export default StatusScreen;