import React from 'react'

import ApplicationSubmit from './ApplicationSubmit'

import Card from '../components/Card'
import SmartLink from '../components/SmartLink'

class Career extends React.Component {
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
					Work at AeroWay
				</b>
				<Card>
					At AeroWay, we're committed to find new partners that not only can give to the future of the corporate cause, but also contribute
					to the community of people that help us fly the next generation of customers. If you would like to apply to any of our over 200 positions,
					please fill out the form below.
				</Card>
				<Card>
					<div>
						Title
					</div>
					<input
						name="title"
						type="text"
						placeholder="e.g. Ms. Mrs. Mr."
					/>
					<div>
						Full Name
					</div>
					<input
						name="fullName"
						type="text"
					/>
					<div>
						Your Email Address
					</div>
					<input
						name="email"
						type="text"
					/>
					<div>
						Position
					</div>
					<input
						name="position"
						type="text"
					/>
					<div>
						Years of Experience
					</div>
					<input
						name="experience"
						type="text"
					/>
					<div>
						Current/Previous Job Title
					</div>
					<input
						name="titlePrev"
						type="text"
					/>
					<div style={{
						paddingTop: "2em",
						display: "flex",
						flexDirection: "row-reverse",
					}}>
						<SmartLink href="/appSubmit">
							Submit
						</SmartLink>
					</div>

				</Card>
			</div>
		);
	}
}

export default Career;