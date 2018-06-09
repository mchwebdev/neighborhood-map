import React, { Component } from 'react'

class ParkList extends Component {
	render() {
		const { park, showMarker } = this.props
		return (
			<button
				className="park-list-btn"
				onClick={ e => showMarker(e) }
				type="submit"
				value={ park.name }>{ park.name }
			</button>
		)
	}
}

export default ParkList