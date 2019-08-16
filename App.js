import React from 'react';
import * as Font from 'expo-font';
import { StyleSheet } from 'react-native';

StyleSheet.setStyleAttributePreprocessor('fontFamily', Font.processFontFamily);
import Root from './src/Main';
export default class App extends React.Component {
  render() {
    return <Root {...this.props} />;
  }
}
