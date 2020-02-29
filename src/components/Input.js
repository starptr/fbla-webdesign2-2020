import React from 'react'

import colors from '../colors.json'

class Input extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<input
				{...this.props}
			/>
		)
	}
}