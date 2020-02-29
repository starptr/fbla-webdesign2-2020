import React from 'react'

import Card from '../components/Card'
import Punchout from '../components/Punchout'
import SmartLink from '../components/SmartLink';

class Explore extends React.Component {
	destinationCard = (destObj) => {
		const city_name = destObj.city;
		const city_desc = destObj.desc;
		const imgPath = destObj.path;

		return (
			<SmartLink href="/Book" noStyle={true}>
				<Card style={{
					overflow: "auto",
					padding: "1rem",
				}}>
					<div style={{
						display: "flex",
					}}>
						<Card style={{
							flex: 1.5,
							display: "flex",
							width: "50%",
							margin: 0,
							padding: 0,
						}}>
							<img
								src={imgPath}
								style={{
									display: "block",
									objectFit: "cover",
									width: "100%",
									borderRadius: "12px",
								}}
							/>
						</Card>
						<div style={{
							flex: 2,
							padding: "2rem",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}>
							<div style={{
								fontSize: "1.2em",
							}}>
								<b style={{ fontSize: "1.2em" }}>{city_name}</b><br />
								{city_desc}
							</div>
						</div>
					</div>
				</Card>
			</SmartLink>
		)
	}

	render() {
		return (
			<>
				<div style={{
					fontSize: "2rem",
					textAlign: "center",
				}}>
					<b>{this.props.title ? this.props.title : "Featured Destinations"}</b>
				</div>
				{this.destinationCard({
					path: "./img/disneyland-ferris.jpg",
					city: "Disneyland",
					desc: `Visit the world's most iconic amusement park! As a family-friendly attraction with its recognizable characters, the Happiest Place on Earth
						is a great vacation for both children and adults alike.`,
				})}
				{
					this.destinationCard({
						path: "./img/vegas.jpg",
						city: "Las Vegas",
						desc: `Ka-Ching! The Capital of Casinos is a must-see for all! Like they say, what happens in Vegas, stays in Vegas.`,
					})
				}
				{
					this.destinationCard({
						path: "./img/seattle.jpg",
						city: "Seattle",
						desc: `Enjoy the breathtaking aerial view from the Space Needle in front of the looming Mount Rainer. In the city famous for rain, its underground tunnels
						are a great attraction.`,
					})
				}
			</>
		);
	}
}

export default Explore;