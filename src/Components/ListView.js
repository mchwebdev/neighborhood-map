import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import ParkList from './ParkList'

class ListView extends Component {
	state = {
		query: ''
	}

	updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
	}

	render() {
		const { parks, showMarker } = this.props
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
					onChange={(e) => this.updateQuery(e.target.value)}
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