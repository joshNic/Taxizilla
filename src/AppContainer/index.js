import React, { Component } from 'react';
import { Router } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import scenes from '../routes/scenes';

export default class componentName extends Component {
  // static propTypes = {
  //   store: PropTypes.object.isRerquired
  // };
  render() {
    return (
      <Provider store={this.props.store}>
        <Router scenes={scenes} />
      </Provider>
    );
  }
}
