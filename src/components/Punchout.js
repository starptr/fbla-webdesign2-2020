import React from 'react'

class Punchout extends React.Component {
	render() {
		return (
			/*
			<div
				style={{
					boxSizing: "border-box",
					padding: "0",
					borderRadius: "12px",
					boxShadow: `inset 1.5em 1.5em 3em black, 
						inset -2em -2em 4em white`,
					...this.props.style,
				}}
			>
				{this.props.children}
			</div>
				*/


			<div style={{
				position: "relative",
				...this.props.style,
			}}>
				{this.props.children}
				<div style={{
					position: "absolute",
					boxSizing: "border-box",
					width: "100%",
					height: "99%",
					padding: "0",
					borderRadius: "12px",
					boxShadow: `inset 1.5rem 1.5rem 3rem black, 
						inset -2rem -2rem 4rem white`,
					top: 0,
					left: 0,
				}} />
			</div>
		);
	}
}

export default Punchout;