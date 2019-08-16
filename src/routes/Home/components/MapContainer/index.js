import React from 'react';
import { View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './MapContainerStyles';
import SearchBox from '../SearchBox';
import SearchResults from '../SearchResults';

const MapContainer = ({
  region,
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
  resultTypes,
  predictions,
  getSelectedAddress,
  selectedAddress,
  carMarker,
  nearByDrivers
}) => {
  const { selectedPickUp, selectedDropOff } = selectedAddress || {};

  return (
    <View style={styles.container}>
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
      >
        {selectedPickUp && (
          <MapView.Marker
            coordinate={{
              latitude: selectedPickUp.location.latitude,
              longitude: selectedPickUp.longitude
            }}
            pinColor='green'
          />
        )}
        {selectedDropOff && (
          <MapView.Marker
            coordinate={{
              latitude: selectedDropOff.location.latitude,
              longitude: selectedDropOff.location.longitude
            }}
            pinColor='blue'
          />
        )}

        {nearByDrivers &&
          nearByDrivers.map((marker, index) => (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: marker.coordinate.coordinates[1],
                longitude: marker.coordinate.coordinates[0]
              }}
              image={carMarker}
            />
          ))}
      </MapView>
      <SearchBox
        getInputData={getInputData}
        toggleSearchResultModal={toggleSearchResultModal}
        getAddressPredictions={getAddressPredictions}
        selectedAddress={selectedAddress}
      />
      {(resultTypes.pickUp || resultTypes.dropOff) && (
        <SearchResults
          predictions={predictions}
          getSelectedAddress={getSelectedAddress}
        />
      )}
    </View>
  );
};

export default MapContainer;
