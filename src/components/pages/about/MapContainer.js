import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};
// var uluru = {
//   lat: 21.3824948,
//   lng: -101.901171
// };
export class MapContainer extends Component {
  // ...
  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    // activeMarker: {
    //   position: uluru,
    // },          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
  };
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={17}
        // center={uluru}
        style={mapStyles}
        initialCenter={
          {
            lat: 21.3824948,
            lng: -101.901171
          }
        }
      >
        <Marker
          onClick={this.onMarkerClick}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC1xNL8A3KC0xrIM7aSPVMM8Ei5GObCAhU'
})(MapContainer);
