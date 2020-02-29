import React from 'react'

class ApplicationSubmit extends React.Component {
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
					Thank you!
				</b>
				<br />
				We will get back to you within 5 - 7 business days.
			</div>

		)
	}
}

export default ApplicationSubmit;