import React from 'react'

import Loading from '../components/Loading'
import SmartLink from '../components/SmartLink';
import Card from '../components/Card'

import Explore from '../pages/Explore'

class Ticket extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
		};

		setTimeout(() => {
			this.setState({
				isLoading: false,
			});
		}, 2000);
	}

	render() {
		if (this.state.isLoading) {
			return (
				<Loading
					isLabeled={true}
					style={{
						textAlign: "center",
					}}
				/>
			);
		}
		else {
			return (
				<div style={{
					display: "flex",
					justifyContent: "center"
				}}>
					<div style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
						<b style={{
							fontSize: "2rem",
						}}>
							Thank you for your purchase!
						</b>
						<Card style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}>
							<SmartLink href='/ticket.pdf' target="_blank" style={{
								fontSize: "2em",
							}}>
								Print Ticket
							</SmartLink>
						</Card>
						<Explore title="Explore More Destinations" />
					</div>
				</div>
			)
		}
	}
}

export default Ticket;