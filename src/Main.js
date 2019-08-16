import React, { Component } from 'react';
import { Text, View } from 'react-native';
import createStore from './store/createStore';
import AppContainer from './AppContainer';

export default class Root extends Component {
  renderApp() {
    const initialState = window.__INTITIAL_STATE__;
    const store = createStore(initialState);
    return <AppContainer store={store} />;
  }
  render() {
    return this.renderApp();
  }
}
