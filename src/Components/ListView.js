import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import ParkList from './ParkList'

class ListView extends Component {
	state = {
		query: '',
		filteredMarkers: [] // Create an array that will hold the filtered markers.
	}

    handleParks = (e) => {
        const query = e.target.value.toLowerCase(); // Whatever the user searches for will be our query
        const markers = this.props.markers; //Grab the Application default markers array.
        const newMarkers = [];

        markers.forEach(function (marker) {
            if (marker.title.toLowerCase().indexOf(query.toLowerCase()) >= 0) { //Filter only kicks in if there is actually some input by the user.
                marker.setVisible(true);
                newMarkers.push(marker);
            } else {
                marker.setVisible(false);
            }
        });

        this.setState({filteredMarkers: newMarkers}); //Populate the filteredMarkers that we created with the newly filtered ones.
    }

	updateQuery = (query) => {
		this.setState({ query: query.trim() })
	}

	render() {
		const { parks, showMarker } = this.props
		const {query} = this.state;

		let showingParks
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingParks = parks.filter((park) => match.test(park.name))
    } else {
	  showingParks = parks

	}
		return (
			<div id='list-view'>
				<h1 id='title'>Berlin's best parks</h1>
				<input
					id='filter-input'
					type='text'
					placeholder='filter park...'
					name='filter'

					onChange={e => {
						this.updateQuery(e.target.value.toLowerCase()); //Update the query so that the list view gets rerendered based on the search text
						this.handleParks(e) // Call the handleParks function
						}
					}

					/>
				<ul className='park-list'>
					{ showingParks.map( (park, index) => (
							<li key={ index }>
								<ParkList
									park={ park }
									showMarker={ showMarker }
								/>
							</li>
							)
						)
					}
				</ul>
				<p id="attribution"><a href="https://foursquare.com" target="_blank" rel="noopener noreferrer"><b>Foursquare</b></a> API and <b>Google Maps</b> API used for this project</p>
			</div>
		)
	}
}
export default ListView
