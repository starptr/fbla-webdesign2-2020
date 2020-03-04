import React from 'react'
import Select from 'react-select'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

import airports from '../components/api/airports.json'
import stateabbr from '../components/api/stateabbr.json'
import Booker from '../components/api/BookResults'
import Card from '../components/Card'
import ErrorMsg from '../components/ErrorMsg'
import SmartLink from '../components/SmartLink';
import Loading from '../components/Loading'

class Book extends React.Component {
	constructor(props) {
		super(props);
		const today = new Date();
		this.state = {
			locStart: "",
			locEnd: "",
			locStartObj: null,
			locEndObj: null,
			dateStart: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, today.getHours(), today.getMinutes()),
			dateEnd: "",
			ctPassengers: "1",
			isRoundTrip: true,
			errorMessage: {},

			flightsDepart: null,
			flightsArrive: null,
			optionDepart: null,
			optionArrive: null,

			isLoading: false,
		};

		this.airportLocs = airports.map((airport) => {
			const city = airport.municipality;
			const state = stateabbr[airport.iso_region.slice(3)];
			const code = airport.local_code;
			return city + ", " + state + " (" + code + ")";
		});
		this.airportLocs.sort();

		this.airportLocs_selectable = [];
		this.airportLocs.forEach((airport) => {
			this.airportLocs_selectable.push({
				value: airport,
				label: airport,
			});
		});
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

	handleChangeSelect_from = (option) => {
		const valueOf = option.value;
		this.setState((prevState) => {
			return ({
				locStart: valueOf,
				locStartObj: option,
				errorMessage: {
					...prevState.errorMessage,
					locStart: null,
				},
			});
		});
	}

	handleChangeSelect_to = (option) => {
		const valueOf = option.value;
		this.setState((prevState) => {
			return ({
				locEnd: valueOf,
				locEndObj: option,
				errorMessage: {
					...prevState.errorMessage,
					locEnd: null,
				},
			});
		});
	}

	handleChange_dateStart = (date) => {
		this.setState({
			dateStart: date,
		});
	}

	handleChange_dateEnd = (date) => {
		this.setState({
			dateEnd: date,
		});
	}

	handleChange_isRoundTrip = (event) => {
		const valueOf = event.target.value;
		this.setState((prevState) => {
			return ({
				isRoundTrip: valueOf === "Roundtrip",
			})
		})
	}

	setState_errorMessage = (field_str, string) => {
		this.setState((prevState) => {
			return ({
				errorMessage: {
					...prevState.errorMessage,
					[field_str]: string,
				},
			})
		});
	}

	handleSubmit = (event) => {
		let errMsg = {};

		//Check ticket number
		const ctPassengers_parsed = +this.state.ctPassengers;
		if (!Number.isInteger(ctPassengers_parsed)) {
			errMsg["ctPassengers"] = "Please enter a valid number";
		} else if (ctPassengers_parsed <= 0) {
			errMsg["ctPassengers"] = "Please enter at least 1 seat";
		} else if (ctPassengers_parsed > 10) {
			errMsg["ctPassengers"] = "Sorry! At most 10 tickets may be purchased";
		}

		//Check airport names
		let locStart_copy = this.state.locStart;
		let locEnd_copy = this.state.locEnd;
		locStart_copy.trim();
		locEnd_copy.trim();

		if (!this.airportLocs.includes(locStart_copy)) {
			errMsg["locStart"] = "Please enter or select a valid airport";
		}
		if (!this.airportLocs.includes(locEnd_copy)) {
			errMsg["locEnd"] = "Please enter or select a valid airport";
		} else if (locStart_copy === locEnd_copy) {
			errMsg["locEnd"] = "Please enter a different airport";
		}

		//Set error messages regardless prev value
		this.setState((prevState) => {
			return ({
				errorMessage: errMsg,
			})
		});

		/*
		//Check ticket count is int in [1,10]
		const ctPassengers_parsed = parseInt(this.state.ctPassengers);
		if (!Number.isInteger(ctPassengers_parsed)) {
			isFormValid = false;
			this.setState_errorMessage("ctPassengers", );
		} else if (ctPassengers_parsed <= 0) {
			isFormValid = false;
			this.setState_errorMessage("ctPassengers", "Please enter at least 1 seat");
		} else if (ctPassengers_parsed > 10) {
			isFormValid = false;
			this.setState_errorMessage("ctPassengers", "Sorry! At most 10 tickets may be purchased");
		}

		//Check airport names
		if (!this.airportLocs.includes(this.state.locStart)) {
			isFormValid = false;
			this.setState_errorMessage("locStart", "Please enter or select a valid airport");
		}
		if (!this.airportLocs.includes(this.state.locEnd)) {
			isFormValid = false;
			this.setState_errorMessage("locEnd", "Please enter or select a valid airport");
		}
		*/

		if (Object.keys(errMsg).length === 0) {
			this.setState({
				isLoading: true,
			});

			setTimeout(() => {
				this.setState({
					isLoading: false,
				});

				this.setState((prevState) => {
					return ({
						optionDepart: null,
						optionArrive: null,
					});
				});

				const queryDepart = {
					date: this.state.dateStart,
					ctPassengers: this.state.ctPassengers,
					portStart: locStart_copy.slice(-4, -1),
					portEnd: locEnd_copy.slice(-4, -1),
				};

				this.setState((prevState) => {
					return ({
						flightsDepart: Booker(queryDepart),
					});
				});

				if (this.state.isRoundTrip) {
					const queryArrive = {
						date: this.state.dateEnd,
						ctPassengers: this.state.ctPassengers,
						portStart: locEnd_copy.slice(-4, -1),
						portEnd: locStart_copy.slice(-4, -1),
					};

					this.setState((prevState) => {
						return ({
							flightsArrive: Booker(queryArrive),
						});
					});
				}
			}, 2000);
		}

		event.preventDefault();
	}

	handleChange_flightDepart = (event) => {
		const valueOf = parseInt(event.target.value);
		this.setState((prevState) => {
			return ({
				optionDepart: valueOf,
			});
		});
	}

	handleChange_flightArrive = (event) => {
		const valueOf = parseInt(event.target.value);
		this.setState((prevState) => {
			return ({
				optionArrive: valueOf,
			});
		});
	}

	getPrice_cents = (flightIndex, optionIndex, isDepart) => {
		const basePrice_cents = (isDepart ? this.state.flightsDepart : this.state.flightsArrive)[flightIndex].price_cents;
		const addonPrice_cents = [0, 4000, basePrice_cents];
		return basePrice_cents + addonPrice_cents[optionIndex];
	}

	processTime = (date) => {
		const isAM = date.getHours() < 12;
		let hour;
		if (date.getHours() === 0) hour = 12;
		else if (date.getHours() > 12) hour = date.getHours() - 12;
		else hour = date.getHours();
		const minute = date.getMinutes();
		return ({
			hour: hour,
			minute: minute,
			isAM: isAM,
		});
	}

	processDuration = (duration) => {
		return ({
			hour: duration.getHours(),
			minute: duration.getMinutes(),
		});
	}

	forceDigits2 = (num) => {
		if (num < 1) return `00`;
		else if (num < 10) return `0${num}`;
		else return num;
	}

	generateFlightList = (heading, flights, mode) => {
		const checkedValue = (mode === 0) ? this.state.optionDepart : this.state.optionArrive;
		const onChangeHandler = (mode === 0) ? this.handleChange_flightDepart : this.handleChange_flightArrive;

		return (
			flights
				?
				<div>
					<div style={{
						textAlign: "center",
					}}>
						<b>{heading}</b>
					</div>
					<Card style={{
						display: "flex",
						paddingTop: "0.5rem",
						paddingBottom: "0.5rem",
					}}>
						<div style={{
							flex: 2,
						}}>
							<div style={{
								display: "flex",
								justifyContent: "space-between",
							}}>
								<span>
									Departs
								</span>
								<span>

								</span>
								<span>
									Arrives
								</span>
							</div>
						</div>
						<div style={{
							flex: 1,
							textAlign: "right",
						}}>
							AeroBasic
						</div>
						<div style={{
							flex: 1,
							textAlign: "right",
						}}>
							AeroPremium
						</div>
						<div style={{
							flex: 1,
							textAlign: "right",
						}}>
							AeroFirst
						</div>
					</Card>
					{
						flights.map((flight, flightIndex) => {
							const today = new Date();
							const timeStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), flight.dept_hour, flight.dept_minute);
							const timeEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), flight.dept_hour, flight.dept_minute + flight.timeInMinutes);
							const timeDuration = new Date(timeEnd - timeStart);
							const basePrice_cents = flight.price_cents;

							const timeStartObj = this.processTime(timeStart);
							const timeEndObj = this.processTime(timeEnd);
							const timeDurationObj = this.processDuration(timeDuration);
							const isSameDay = timeStart.getDate() === timeEnd.getDate();

							if (timeStartObj.isAM && timeStartObj.hour < 5) return null;
							else return (
								<Card style={{
									display: "flex",
									paddingBottom: "0.5rem",
								}}>
									<div style={{
										flex: 2,
									}}>
										<div style={{
											display: "flex",
											justifyContent: "space-between",
										}}>
											<span>
												{timeStartObj.hour}:{this.forceDigits2(timeStartObj.minute)}{timeStartObj.isAM ? "AM" : "PM"}
											</span>
											<span>
												⟶
											</span>
											<span>
												{timeEndObj.hour}:{this.forceDigits2(timeEndObj.minute)}{timeEndObj.isAM ? "AM" : "PM"}{isSameDay ? null : <sup>+1</sup>}
											</span>
										</div>
										<small>
											{flight.vehicalName}
										</small>
									</div>
									{
										[...Array(3)].map((option, optionIndex) => {
											const price_cents = Math.floor(this.getPrice_cents(flightIndex, optionIndex, mode === 0));
											const value = flightIndex * 10 + optionIndex;

											const dollars_str = Math.floor(price_cents / 100).toString();
											const cents_str = `.${this.forceDigits2(price_cents % 100)}`;
											const price_str = `$${dollars_str + cents_str}`;

											return (
												<div style={{
													flex: 1,
													textAlign: "right",
												}}>
													<label>
														<input
															name={heading}
															type="radio"
															value={value}
															checked={checkedValue === value}
															onChange={onChangeHandler}
														/>
														{price_str}
													</label>
												</div>
											);
										})
									}
								</Card>
							);
						})
					}
				</div>
				: null
		)
	}

	generatePayment = () => {
		if ((this.state.isRoundTrip && Number.isInteger(this.state.optionDepart) && Number.isInteger(this.state.optionArrive)) || (!this.state.isRoundTrip && Number.isInteger(this.state.optionDepart))) {
			const isRoundTrip = this.state.isRoundTrip;
			const optionDepart = this.state.optionDepart;
			const optionArrive = this.state.optionArrive;

			const flightIndex_depart = Math.floor(optionDepart / 10);
			const optionIndex_depart = optionDepart % 10;

			let flightIndex_arrive = isRoundTrip ? Math.floor(optionArrive / 10) : null;
			let optionIndex_arrive = isRoundTrip ? optionArrive % 10 : null;

			let price_cents_arrival = null;
			let dollars_str_arrival = null;
			let cents_str_arrival = null;
			let price_str_arrival = null;
			if (isRoundTrip) {
				price_cents_arrival = this.getPrice_cents(flightIndex_arrive, optionIndex_arrive, false);
				dollars_str_arrival = Math.floor(price_cents_arrival / 100).toString();
				cents_str_arrival = `.${this.forceDigits2(price_cents_arrival % 100)}`;
				price_str_arrival = `$${dollars_str_arrival + cents_str_arrival}`;
			}

			const price_cents = this.getPrice_cents(flightIndex_depart, optionIndex_depart, true);
			const dollars_str = Math.floor(price_cents / 100).toString();
			const cents_str = `.${this.forceDigits2(price_cents % 100)}`;
			const price_str = `$${dollars_str + cents_str}`;

			const price_cents_total = (price_cents + price_cents_arrival) * this.state.ctPassengers;
			const dollars_str_total = Math.floor(price_cents_total / 100).toString();
			const cents_str_total = `.${this.forceDigits2(price_cents_total % 100)}`;
			const price_str_total = `$${dollars_str_total + cents_str_total}`;

			return (
				<div style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
					<b>Purchase Tickets</b>
					<Card style={{
						width: "15em",
						display: "flex",
						flexDirection: "column",
					}}>
						<div style={{
							display: "flex",
						}}>
							<div style={{
								flex: 2,
							}}>
								Departure
							</div>
							<div style={{
								flex: 1,
								textAlign: "right",
							}}>
								{price_str}
							</div>
						</div>
						{
							isRoundTrip
								? <div style={{
									display: "flex",
								}}>
									<div style={{
										flex: 2,
									}}>
										Arrival
									</div>
									<div style={{
										flex: 1,
										textAlign: "right",
									}}>
										{price_str_arrival}
									</div>
								</div>
								: null
						}
						<div style={{
							display: "flex",
						}}>
							<div style={{
								flex: 2,
							}}>
								Passengers
							</div>
							<div style={{
								flex: 1,
								textAlign: "right",
							}}>
								x{this.state.ctPassengers}
							</div>
						</div>
						<div style={{
							display: "flex",
						}}>
							<small style={{
								flex: 2,
							}}>
								Service Fees and Taxes are included.
							</small>
							<div style={{
								flex: 1,
							}}>
							</div>
						</div>
						<div style={{
							display: "flex",
						}}>
							<b style={{
								flex: 2,
							}}>
								Total
							</b>
							<div style={{
								flex: 1,
								textAlign: "right",
							}}>
								{price_str_total}
							</div>
						</div>
						<div style={{
							display: "flex",
							marginTop: "1em",
						}}>
							<div style={{
								flex: 2,
							}}></div>
							<SmartLink
								href="/tickets"
								style={{
									flex: 1,
								}}>
								Purchase
							</SmartLink>
						</div>
					</Card>
				</div>
			)
		} else {
			return null;
		}
	}

	render() {
		/*
		console.log(Booker({
			date: new Date(2020, 2, 1),
			ctPassengers: 1,
			portStart: "SFO",
			portEnd: "SAN",
		}));
		*/

		const today = new Date();
		const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, today.getHours(), today.getMinutes(), today.getSeconds());
		const futureMax = new Date(today.getFullYear() + 10, today.getMonth(), today.getDate());

		const returnDateComponent = (
			<label style={{
				flex: 1,
			}}>
				Returning Date <br />
				<DatePicker
					showPopperArrow={false}
					selected={this.state.dateEnd}
					onChange={this.handleChange_dateEnd}
					minDate={this.state.dateStart}
					maxDate={futureMax}
				/>
			</label>
		)

		return (
			<>
				<div style={{
					fontSize: "2rem",
					textAlign: "center",
				}}>
					<b>Reserve a Flight</b>
				</div>
				<Card style={{
					paddingBottom: "1em",
				}}>
					<form
						onSubmit={this.handleSubmit}
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "stretch",
						}}
					>
						<div style={{
							display: "flex",
						}}>
							<label style={{
								flex: 1,
							}}>
								From <br />
								{/*
								<input
									name="locStart"
									type="text"
									placeholder="Where are you leaving?"
									value={this.state.locStart}
									onChange={this.handleChange}
									list="airportList"
								/>								
								*/}
								<Select
									isSearchable={false}
									value={this.state.locStartObj}
									onChange={this.handleChangeSelect_from}
									options={this.airportLocs_selectable}
									className="react-select-container"
									classNamePrefix="react-select"
								/>
								<ErrorMsg>
									{this.state.errorMessage.locStart}
								</ErrorMsg>
							</label>
							<label style={{
								flex: 1,
							}}>
								To <br />
								{/*
								<input
									name="locEnd"
									type="text"
									placeholder="Where would you like to go?"
									value={this.state.locEnd}
									onChange={this.handleChange}
									list="airportList"
								/>
								*/}
								<Select
									isSearchable={false}
									value={this.state.locEndObj}
									onChange={this.handleChangeSelect_to}
									options={this.airportLocs_selectable}
									className="react-select-container"
									classNamePrefix="react-select"
								/>
								<ErrorMsg>
									{this.state.errorMessage.locEnd}
								</ErrorMsg>
							</label>
							<datalist id="airportList">
								{this.airportLocs.map((location, index) => {
									return (
										<option key={index}>{location}</option>
									)
								})}
							</datalist>
							<label style={{
								flex: 1,
							}}>
								Passengers <br />
								<input
									name="ctPassengers"
									type="text"
									placeholder="How many seats?"
									value={this.state.ctPassengers}
									onChange={this.handleChange}
								/>
								<ErrorMsg>
									{this.state.errorMessage.ctPassengers}
								</ErrorMsg>
							</label>
						</div>
						<div style={{
							display: "flex",
							marginTop: "1em",
						}}>
							<label style={{
								flex: 1,
							}}>
								Departing Date <br />
								<DatePicker
									showPopperArrow={false}
									selected={this.state.dateStart}
									onChange={this.handleChange_dateStart}
									minDate={tomorrow}
									maxDate={futureMax}
								/>
							</label>
							{this.state.isRoundTrip ? returnDateComponent : null}
						</div>
						<div style={{
							display: "flex",
							marginTop: "1em",
							height: "3em",
						}}>
							<label>
								<input
									name="isRoundTrip"
									type="radio"
									value={"Roundtrip"}
									checked={this.state.isRoundTrip}
									onChange={this.handleChange_isRoundTrip}
								/>
								Roundtrip
							</label>
							{` `}
							<label>
								<input
									name="isRoundTrip"
									type="radio"
									value={"One-Way"}
									checked={!this.state.isRoundTrip}
									onChange={this.handleChange_isRoundTrip}
								/>
								One-Way
							</label>
							<span style={{
								flex: 1,
								display: "flex",
								justifyContent: "flex-end",
							}}>
								<input
									type="submit"
									value="Search"
									style={{
										width: "10em",
									}}
								/>
							</span>
						</div>
					</form>
				</Card>
				{this.state.isLoading
					? <Loading style={{ textAlign: "center" }} />
					: null
				}
				{this.state.flightsDepart ? null : <div style={{ paddingTop: "20rem" }} />}
				{this.generateFlightList("Departing Flights", this.state.flightsDepart, 0)}
				{this.state.isRoundTrip ? this.generateFlightList("Returning Flights", this.state.flightsArrive, 1) : null}
				{this.generatePayment()}
			</>
		);
	}
}

export default Book;