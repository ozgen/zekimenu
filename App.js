/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from "react";

// TODO: remove these helper commands
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps is deprecated and will be removed',
  // 'Warning: Slider has been extracted from react-native core',
  // 'Warning: componentWillReceiveProps has been renamed, and is not recommended',
  'Warning: componentWillUpdate is deprecated and will be removed',
  'Warning: ViewPagerAndroid has been extracted from react-native core and will be removed',
  'Warning: componentWillMount is deprecated and will be removed in the next major version',
  // componentWillMount is used in CartA, B
]);

// import MainNavigatorA or MainNavigatorB to preview design differnces
import MainNavigator from "./src/navigation/MainNavigatorA";

// APP
const App = () => <MainNavigator />;

export default App;
