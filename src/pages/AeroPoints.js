import React from 'react'

import Card from '../components/Card'

class AeroPoints extends React.Component {
	destinationCard = (destObj) => {
		const city_name = destObj.city;
		const city_desc = destObj.desc;
		const imgPath = destObj.path;

		return (
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
		)
	}

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
					AeroPoints
				</b>
				<br />
				Join and get rewards for flying!
				{this.destinationCard({
					city: "Earn your points",
					desc: `From grocery shopping to buying a car, almost all purchases earn you points, including miles, of course. Before you know it, you'll have
						enough to book a flight!`,
					path: "./img/restaurant.jpg",
				})}
				{this.destinationCard({
					city: "Redeem your earnings",
					desc: `Concerned that the redemption cost of points will be too high? No worries! We set the number of points you need to
						book a seat based on the current fare for that flight—no minimums involved.`,
					path: "./img/waterfall-night.jpg",
				})}
				{this.destinationCard({
					city: "Work with your friends",
					desc: `Pool points together with up to 15 friends and family members and multiply your earnings. With every member that joins, get a bonus 500 points
						added to your pool!`,
					path: "./img/friends.jpg",
				})}
			</div>
		)
	}
}

export default AeroPoints;