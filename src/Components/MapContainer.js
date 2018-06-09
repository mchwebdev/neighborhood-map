import React, { Component } from 'react'
import { Map } from 'google-maps-react'

class MapContainer extends Component {
	render() {
		const { google, addMarkers } = this.props
		return (
			<div id='map-container'>
				<Map
					google={ google }
					initialCenter={{
            lat: 52.520007,
            lng: 13.404954
          }}
					zoom={ 13 }
					onReady={ addMarkers }>
				</Map >
			</div>
		)
	}
}

export default MapContainer
