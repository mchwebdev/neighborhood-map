import React, { Component } from 'react'
import ListView from './Components/ListView'
import MapContainer from './Components/MapContainer'
import { GoogleApiWrapper } from 'google-maps-react'
import './App.css'
import { parks } from './parks'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      parks: parks,
      map: '',
      markers: [],
      // currentMarker: '',
      infoWindows: [],
      currentInfoWindow: '',
    }
  }

  showMarker = e => {
    const { markers } = this.state
    const { google } = this.props

    markers.forEach( marker => {
    	if (e.target.value === marker.title || e.target.title === marker.title) {
        // this.setState({
        //   currentMarker: marker
        // })
        // bounce the current marker
        marker.setAnimation(google.maps.Animation.BOUNCE)
        this.showInfoWindow(marker)
        // this.resetAnimation()
      } else {
          // stop the bounce animation of unselected markers
          marker.setAnimation(null)
      }
    })
  }

  showInfoWindow = marker => {
    const { map, infoWindows } = this.state
    const { google } = this.props
    const newInfoWindows = []

    // create info windows
    const contentString = `
    <div className="info-window">
      <h3>${ marker.title }</h3>
    </div>`
    const infoWindow = new google.maps.InfoWindow({
      content: contentString
    })

    // open the marker's info window
    infoWindow.open(map, marker)

    newInfoWindows.push(infoWindow)
    // this.setState({ currentInfoWindow: infoWindow }, () => console.log(this.state.currentInfoWindow))
    this.setState(prevState => {
      return {
        infoWindows: prevState.infoWindows.concat(newInfoWindows),
      }
    })
    // reset info window
    // this.resetInfoWindow()
    infoWindows.forEach( infoWindow => {
      if (!!infoWindow) {
        infoWindow.close()
      }
    })
  }

  // resetAnimation = () => {
  //   const { markers } = this.state
  //   const { google } = this.props
  //   markers.forEach( marker => {
  //     if (this.state.currentMarker != marker) {
  //       marker.setAnimation(null)
  //     }
  //   })
  // }

  // resetInfoWindow = () => {
  //   const { infoWindows, currentInfoWindow } = this.state
  //   console.log(infoWindows)
  //   infoWindows.forEach( infoWindow => {
  //     if (currentInfoWindow !== infoWindow) {
  //       infoWindow.close()
  //     }
  //   })
  // }

  addMarkers = (marker, map) => {
    const { google } = this.props
    const markers = []

    this.state.parks.forEach((park, index) => {
      // create markers for each park
      const marker = new google.maps.Marker({
        map: map,
        position: { lat: park.location.lat, lng: park.location.lng },
        title: park.name,
        animation: google.maps.Animation.DROP,
        id: index
      })
      markers.push(marker)
      marker.addListener('click', (e) => this.showMarker(e.Ha))
    })
    this.setState({ markers, map })
  }

  render() {
    const { google } = this.props
    return (
      <div className="app">
        <ListView
          parks={ this.state.parks }
          markers={ this.state.markers }
          showMarker={ this.showMarker }
        />
        <MapContainer
          google={ google }
          parks={ this.state.parks }
          onMarkerClick={ this.onMarkerClick }
          addMarkers={ this.addMarkers }
        />
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCPV6AvpoVqGdCo_Sdrxzgtsb3tGq0CwQg'
})(App)
