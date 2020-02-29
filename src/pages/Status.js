import React from 'react'

class Status extends React.Component {
	render() {
		return (
			<div style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				margin: "2rem",
			}}>
				<b style={{
					fontSize: "2rem",
				}}>
					Flight Statuses
				</b>
				<br />
				No worries! All flights are currently operating normally.
			</div>

		)
	}
}

export default Status;