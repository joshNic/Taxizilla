import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container } from 'native-base';
import MapContainer from './MapContainer';
import HeaderComponent from '../../../components/HeaderComponent';
import FooterComponent from '../../../components/FooterComponent';
import Fare from './Fare';
import Fab from './Fab';

const taxiLogo = require('../../../assets/taxi_logo_white.png');
const carMarker = require('../../../assets/carMarker.png');

export default class Home extends Component {
  componentDidMount() {
    this.props.getCurrentLocation();
    setTimeout(() => {
      this.props.getNearByDrivers();
    }, 1000);
    // this.props.getNearByDrivers();
    // setTimeout(function() {
    //   rx;
    // }, 1000);
  }

  render() {
    // console.log('Propsss', this.props);
    // const region = {
    //   latitude: 37.785834,
    //   longitude: -122.406417,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.04258004926108375
    // };
    //console.log('this is running');
    return (
      <Container>
        <HeaderComponent logo={taxiLogo} />
        {this.props.region.latitude && (
          <MapContainer
            region={this.props.region}
            getInputData={this.props.getInputData}
            toggleSearchResultModal={this.props.toggleSearchResultModal}
            getAddressPredictions={this.props.getAddressPredictions}
            resultTypes={this.props.resultTypes}
            predictions={this.props.predictions}
            getSelectedAddress={this.props.getSelectedAddress}
            selectedAddress={this.props.selectedAddress}
            carMarker={taxiLogo}
            nearByDrivers={this.props.nearByDrivers}
          />
        )}
        <Fab onPressAction={() => this.props.bookCar()} />
        {this.props.fare && <Fare fare={this.props.fare} />}
        <FooterComponent logo={carMarker} />
      </Container>
    );
  }
}
