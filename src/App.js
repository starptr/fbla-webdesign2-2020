import React from 'react';
import { Helmet } from 'react-helmet'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch
} from "react-router-dom"

import './index.css'
import logo from './logo.svg';
import './App.css';

import meta from './meta.json'
import colors from './colors.json'
import Layout from './components/Layout'
import Card from './components/Card'
import SmartLink from './components/SmartLink';
import ScrollToTop from './components/ScrollToTop'

import Book from './pages/Book'
import Ticket from './pages/Ticket'
import Explore from './pages/Explore'
import Career from './pages/Career'
import FBLA from './pages/FBLA'
import ApplicationSubmit from './pages/ApplicationSubmit';
import Status from './pages/Status'
import AeroPoints from './pages/AeroPoints';
import Legal from './pages/Legal'

const reload = () => window.location.reload();

class App extends React.Component {
	render() {
		return (
			<div style={{
				minHeight: "100vh",
			}}>
				<Router>
					<ScrollToTop />
					<Layout>
						<Switch>
							<Route exact path="/">
								<div
									style={{
										position: "relative",
										margin: "2rem",
										display: "inline-block",
									}}
								>
									<video loop autoPlay muted style={{
										boxSizing: "border-box",
										width: "100%",
										padding: "0",
										borderRadius: "10rem",
										display: "block",
									}}>
										<source src={require("./assets/airplane-view.mp4")} type="video/mp4" />
									</video>
									<div style={{
										position: "absolute",
										display: "inline-block",
										boxSizing: "border-box",
										width: "100%",
										height: "100%",
										padding: "0",
										borderRadius: "10rem",
										boxShadow: `inset 1.5rem 1.5rem 3rem black, 
                    				inset -2rem -2rem 4rem white`,
										top: 0,
										left: 0,
									}} />
									<div style={{
										position: "absolute",
										top: 0,
										textAlign: "center",
										color: "white",
										width: "100%",
										fontSize: `10vw`,
										marginTop: "40px",
									}}>
										<img src={require('./assets/send-white.svg')} height="100" />
										Aeroway
								</div>
								</div>
								<Card style={{
									position: "relative",
									padding: 0,
									borderRadius: "10rem",
								}}>
									<img
										src="./img/airplane-seats.jpg"
										style={{
											width: "100%",
											height: "100%",
											display: "block",
											borderRadius: "10rem",
										}}
									/>
									<div style={{
										position: "absolute",
										display: "inline-block",
										boxSizing: "border-box",
										width: "100%",
										height: "100%",
										padding: "0",
										borderRadius: "10rem",
										boxShadow: `inset 1.5rem 1.5rem 3rem black, 
                    				inset -2rem -2rem 4rem white`,
										top: 0,
										left: 0,
									}} />
									<div style={{
										position: "absolute",
										right: 0,
										bottom: 0,
										color: "white",
										textAlign: "right",
										paddingRight: "4em",
										paddingBottom: "4em",
										backgroundColor: "#AFB5BB9D",
										borderRadius: "0 0 10rem 10rem",
									}}>
										<b style={{
											fontSize: "6em",
										}}>
											Fly Your Way.
									</b>
										<p style={{
											display: "inline-block",
											fontSize: "1.5em",
											width: "60%",
											marginTop: "0.5em",
										}}>
											Changes and cancellations you make to your ticket at least 48 hours before departure are free of charge, worry-free.
									</p>
									</div>
								</Card>
								<div style={{
									display: "flex",
									justifyContent: "space-between",
								}}>
									<Card style={{
										position: "relative",
										padding: 0,
										borderRadius: "5rem",
										display: "inline-block",
										marginRight: 0,
										width: "45%",
									}}>
										<img
											src="./img/airplane-firstclass.jpg"
											style={{
												width: "100%",
												height: "100%",
												display: "block",
												borderRadius: "5rem",
											}}
										/>
										<div style={{
											position: "absolute",
											display: "inline-block",
											boxSizing: "border-box",
											width: "100%",
											height: "100%",
											padding: "0",
											borderRadius: "5rem",
											boxShadow: `inset 1rem 1rem 2rem black, 
                    				inset -1rem -1rem 2rem white`,
											top: 0,
											left: 0,
										}} />
										<div
											style={{
												boxSizing: "border-box",
												position: "absolute",
												right: 0,
												bottom: 0,
												color: "white",
												textAlign: "left",
												paddingLeft: "4em",
												paddingBottom: "1em",
												backgroundColor: "#AFB5BB9D",
												borderRadius: "0 0 5rem 5rem",
												width: "100%",
											}}
										>
											<b style={{
												fontSize: "2em",
											}}>
												AeroFirst
										</b>
											<br />
											<p style={{
												display: "inline-block",
												fontSize: "1em",
												width: "60%",
												marginTop: "0.5em",
												marginBottom: 0,
											}}>
												The newest class addition.
										</p>
										</div>
									</Card>
									<Card style={{
										position: "relative",
										padding: 0,
										borderRadius: "5rem",
										display: "inline-block",										
										marginLeft: 0,
										width: "45%",
									}}>
										<img
											src="./img/airplane-outward.jpg"
											style={{
												width: "100%",
												height: "100%",
												display: "block",
												borderRadius: "5rem",
											}}
										/>
										<div style={{
											position: "absolute",
											display: "inline-block",
											boxSizing: "border-box",
											width: "100%",
											height: "100%",
											padding: "0",
											borderRadius: "5rem",
											boxShadow: `inset 1rem 1rem 2rem black, 
                    						inset -1rem -1rem 2rem white`,
											top: 0,
											left: 0,
										}} />
										<SmartLink
											noStyle={true}
											style={{
												boxSizing: "border-box",
												position: "absolute",
												right: 0,
												bottom: 0,
												color: "white",
												textAlign: "left",
												paddingLeft: "4em",
												paddingBottom: "1em",
												backgroundColor: "#AFB5BB9D",
												borderRadius: "0 0 5rem 5rem",
												width: "100%",
											}}
											href="/AeroPoints"
										>


											<b style={{
												fontSize: "2em",
											}}>
												Join AeroPoints
											</b>
											<br />
											<p style={{
												display: "inline-block",
												fontSize: "1em",
												width: "60%",
												marginTop: "0.5em",
												marginBottom: 0,
											}}>
												Get rewards for flying
										</p>
										</SmartLink>
									</Card>

								</div>
								<Explore />
							</Route>
							<Route path="/book">
								<Helmet>
									<title>Book Flights | {meta.name}</title>
								</Helmet>
								<Book />
							</Route>
							<Route path="/tickets">
								<Helmet>
									<title>Thank you! | {meta.name}</title>
								</Helmet>
								<Ticket />
							</Route>
							<Route path="/explore">
								<Helmet>
									<title>Explore Destinations | {meta.name}</title>
								</Helmet>
								<Explore />
							</Route>
							<Route path="/status">
								<Helmet>
									<title>Status | {meta.name}</title>
								</Helmet>
								<Status />
								<Explore />
							</Route>
							<Route path="/AeroPoints">
								<Helmet>
									<title>AeroPoints | {meta.name}</title>
								</Helmet>
								<AeroPoints />
							</Route>
							<Route path="/legal">
								<Helmet>
									<title>Legal | {meta.name}</title>
								</Helmet>
								<Legal />
							</Route>
							<Route path="/careers">
								<Helmet>
									<title>Careers | {meta.name}</title>
								</Helmet>
								<Career />
							</Route>
							<Route path="/appSubmit">
								<Helmet>
									<title>Application Submitted! | {meta.name}</title>
								</Helmet>
								<ApplicationSubmit />
							</Route>
							<Route path="/fbla">
								<Helmet>
									<title>FBLA Restrictions | {meta.name}</title>
								</Helmet>
								<FBLA />
							</Route>
						</Switch>
					</Layout>
				</Router>
			</div>
		);
	}
}

export default App;
