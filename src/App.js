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
      infoWindows: [],
      currentInfoWindow: '',
    }
    this.getFourSquareInfo = this.getFourSquareInfo.bind(this)
  }

  showMarker = e => {
    const { markers } = this.state
    const { google } = this.props

    markers.forEach( marker => {
    	if (e.target.value === marker.title || e.target.title === marker.title) {
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
    const infoWindow = new google.maps.InfoWindow({})
    this.setState({ currentInfoWindow: infoWindow })

    // set info window infos
    this.getFourSquareInfo(marker)

    // open the marker's info window
    infoWindow.open(map, marker)

    newInfoWindows.push(infoWindow)
    this.setState(prevState => {
      return {
        infoWindows: prevState.infoWindows.concat(newInfoWindows),
      }
    })
    // reset info window
    infoWindows.forEach( infoWindow => {
      if (!!infoWindow) {
        infoWindow.close()
      }
    })
  }

  getFourSquareInfo = marker => {
    const clientId = 'CPE4GJOR3AXFSKMLGC3MRZASDE4LXYIBQCB3HLPDLQNNY3I1'
    const clientSecret = 'WGEIKBAYIVJBK2CPZMYZ3ZNY5VOS3NYQBUK5HDVBBKR2KC4W'
    const url = `https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20130815&ll=${marker.getPosition().lat()},${marker.getPosition().lng()}&limit=1`
    fetch(url)
      .then(
        response => {
          if (response.status !== 200) {
            this.state.currentInfowindow.setContent("Sorry data could not be loaded")
            return
          }
          response.json()
            .then(data => {
              const location = data.response.venues[0]
              const place = `<h3>${location.name}</h3>`
              const street = `<p>${location.location.formattedAddress[0]}</p>`
              const city = `<p>${location.location.formattedAddress[1]}</p>`
              const link = `<a href="https://foursquare.com/v/${location.id}" target="_blank">More on <b>Foursquare</b></a>`
              this.state.currentInfoWindow.setContent(place + street + city + link)
            })
        }
      )
      .catch(error => {
        console.log(error)
        this.state.currentInfoWindow.setContent("Sorry data could not be loaded")
      })
  }

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
