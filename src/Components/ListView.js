import React from 'react'
import ParkList from './ParkList'

const ListView = (props) => {
	const { parks, showMarker } = props
	return (
		<div id='list-view'>
			<h1 id="title">Berlin's best parks</h1>
			<input id="filter-input" type="text" placeholder="filter park..." name="filter" />
			<ul className="park-list">
				{ parks.map( (park, index) => (
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

export default ListView