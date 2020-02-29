import React from 'react'

class Loading extends React.Component {
	render() {
		return (
			<div style={{
				...this.props.style
			}}>
				{this.props.isLabeled
					? <div>
						Loading...
					</div>
					: null
				}
				<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
			</div>
		);
	}
}

export default Loading;