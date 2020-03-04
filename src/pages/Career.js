import React from 'react'

import Card from '../components/Card'
import SmartLink from '../components/SmartLink'
import ErrorMsg from '../components/ErrorMsg'

import ApplicationSubmit from './ApplicationSubmit'

class Career extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			fullName: "",
			email: "",
			position: "",
			yrs: "",
			curPrevJob: "",
			errorMessage: {},

			isFilled: false,
		}
	}

	handleChange = (event) => {
		const valueOf = event.target.value;
		const name = event.target.name;
		this.setState((prevState) => {
			return ({
				[name]: valueOf,
				errorMessage: {
					...prevState.errorMessage,
					[name]: null,
				}
			})
		})
	}

	handleSubmit = (event) => {
		let errMsg = {};

		if (!this.state.title) {
			errMsg["title"] = "Please enter your title";
		}
		if (!this.state.fullName) {
			errMsg["fullName"] = "Please enter your full name";
		}
		if (!this.state.email) {
			errMsg["email"] = "Please enter your email address";
		}
		if (!this.state.position) {
			errMsg["position"] = "Please enter your position of interest";
		}
		if (!this.state.yrs) {
			errMsg["yrs"] = "Please enter your years of experience";
		}
		if (!this.state.curPrevJob) {
			errMsg["curPrevJob"] = "Please enter your current or previous job title";
		}

		this.setState({
			errorMessage: errMsg,
		});

		if (Object.keys(errMsg).length === 0) {
			this.setState({
				isFilled: true,
			});
		}

		event.preventDefault();
	}

	render() {
		if (this.state.isFilled) return <ApplicationSubmit />
		else return (
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
					<form
						onSubmit={this.handleSubmit}
						style={{
							width: "25rem",
						}}
					>
						<div>
							<label>
								Title <br />
								<input
									name="title"
									type="text"
									placeholder="e.g. Ms. Mrs. Mr."
									value={this.state.title}
									onChange={this.handleChange}
								/>
								<ErrorMsg>
									{this.state.errorMessage.title}
								</ErrorMsg>
							</label>
						</div>
						<div>
							<label>
								Full Name
								<input
									name="fullName"
									type="text"
									value={this.state.fullName}
									onChange={this.handleChange}
								/>
								<ErrorMsg>
									{this.state.errorMessage.fullName}
								</ErrorMsg>
							</label>
						</div>
						<div>
							<label>
								Your Email Address
								<input
									name="email"
									type="text"
									value={this.state.email}
									onChange={this.handleChange}
								/>
								<ErrorMsg>
									{this.state.errorMessage.email}
								</ErrorMsg>
							</label>
						</div>
						<div>
							<label>
								Position
								<input
									name="position"
									type="text"
									value={this.state.position}
									onChange={this.handleChange}
								/>
								<ErrorMsg>
									{this.state.errorMessage.position}
								</ErrorMsg>
							</label>
						</div>
						<div>
							<label>
								Years of Experience
								<input
									name="yrs"
									type="text"
									value={this.state.yrs}
									onChange={this.handleChange}
								/>
								<ErrorMsg>
									{this.state.errorMessage.yrs}
								</ErrorMsg>
							</label>
						</div>
						<div>
							<label>
								Current/Previous Job Title
								<input
									name="curPrevJob"
									type="text"
									value={this.state.curPrevJob}
									onChange={this.handleChange}
								/>
								<ErrorMsg>
									{this.state.errorMessage.curPrevJob}
								</ErrorMsg>
							</label>
						</div>
						<div style={{
							paddingTop: "2em",
							display: "flex",
							flexDirection: "row-reverse",
						}}>
							<input
								type="submit"
								value="Submit"
								style={{
									width: "10em",
								}}
							/>
						</div>
					</form>
				</Card>
			</div>
		);
	}
}

export default Career;