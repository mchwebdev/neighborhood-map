import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import ParkList from './ParkList'

class ListView extends Component {
	state = {
		query: ''
	}

	handleParks = showingParks => {
		const filteredParks = showingParks.map(park => park.name)
		const markersTitles = this.props.markers.map(marker => marker.title)
		let intersection = filteredParks.filter(filteredPark => markersTitles.includes(filteredPark))
		console.log(intersection)
		this.props.markers.forEach(marker => {
			if (intersection.includes(marker.title)) {
				marker.setVisible(true)
			} else {
				marker.setVisible(false)
			}
		})
	}

	updateQuery = (query) => {
		this.setState({ query: query.trim() })
	}

	render() {
		const { parks, showMarker, handleParks } = this.props
		const { query } = this.state

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
					value= { query }
					onChange={ (e) => {
							this.updateQuery(e.target.value)
							this.handleParks(showingParks)
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
			</div>
		)
	}
}

export default ListView