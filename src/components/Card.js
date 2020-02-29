import React from 'react'

import colors from '../colors.json'

class Card extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			style: {
				color: colors.soft.text,
				borderRadius: "12px",
				background: colors.soft.bg,
				boxShadow: `6px 6px 12px ${colors.soft.shadowDown}, 
                    -6px -6px 12px ${colors.soft.shadowUp}`,
				margin: "2rem",
				padding: "2rem",
			},
		};
	}

	render() {
		return (
			<div style={{
				...this.state.style,
				...this.props.style,
			}}>
				{this.props.children}
			</div>
		)
	}
}

export default Card;