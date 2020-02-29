import React from 'react'

import meta from '../meta.json'
import colors from '../colors.json'
import LanguageButton from './LanguageButton'
import AccountButton from './AccountButton.js'
import SmartLink from './SmartLink'
import Button from './Button'
import Menu from './Menu'

const stickyBoxStyleBase = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	fontSize: "1.2em",
	//backgroundImage: `linear-gradient(270deg, ${colors.soft.popDark}, ${colors.soft.popLight})`,
	backgroundColor: colors.soft.bg,
	padding: "1.2rem",
	margin: "1.2rem",
}

const substituteBoxStyleBase = {
	height: 0,
	margin: "1.2rem",
}

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSticky: false,
			stickyBoxTop: null,
			stickyBoxStyle: {
				...stickyBoxStyleBase
			},
			substituteBoxStyle: {
				...substituteBoxStyleBase
			},
			menu: {
				isOpen: false,
				top: null,
			},
			isLoggedIn: false,
		};
		this.languageBar = React.createRef();
		this.stickyBox = React.createRef();
		this.substituteBox = React.createRef();
		this.menu = React.createRef();
	}

	componentDidMount() {
        /*
        this.setState((prevState) => {
            return {
                stickyBoxTop: window.scrollY + this.stickyBox.current.getBoundingClientRect().top,
            }
        });
        */
		window.addEventListener("scroll", this.handleScroll);
	}

	handleScroll = (event) => {
		if (typeof window !== 'undefined') {
			//console.log(this.substituteBox.current.getBoundingClientRect().top);
			let stickyBoxHeight;
			let stickyBoxMarginTop;
			let stickyBoxMarginBottom;
            /*
            if (!this.stickyBox.current) stickyBoxHeight = "1em";
            else stickyBoxHeight = this.stickyBox.current.clientHeight;
            */
			if (!this.stickyBox.current) {
				stickyBoxHeight = "1em";
				stickyBoxMarginTop = "1em";
				stickyBoxMarginBottom = "1em";
			}
			else {
				let computed = window.getComputedStyle(this.stickyBox.current, null);
				stickyBoxHeight = parseInt(computed.height) + parseInt(computed.paddingTop) + parseInt(computed.paddingBottom);
				stickyBoxMarginTop = parseInt(computed.marginTop);
				stickyBoxMarginBottom = parseInt(computed.marginBottom);
			}
			if (!this.state.isSticky && this.languageBar.current.getBoundingClientRect().bottom <= 0) { //farther down the page
				this.setState((prevState) => {
					return {
						isSticky: true,
						stickyBoxStyle: {
							...stickyBoxStyleBase,
							position: "fixed",
							top: 0,
							left: 0,
							right: 0,
							//marginLeft: "inherit",
							//marginRight: "inherit",
							boxShadow: `6px 6px 16px #a8afb8`,
							borderRadius: '12px',
						},
						substituteBoxStyle: {
							...substituteBoxStyleBase,
							height: stickyBoxHeight,
							marginTop: stickyBoxMarginTop,
							marginBottom: stickyBoxMarginBottom,
						},
					};
				})
			} else if (this.state.isSticky && this.languageBar.current.getBoundingClientRect().bottom > 0) { //top of the page
				this.setState((prevState) => {
					return {
						isSticky: false,
						stickyBoxStyle: {
							...stickyBoxStyleBase,
						},
						substituteBoxStyle: {
							...substituteBoxStyleBase,
							height: 0,
							marginTop: 0,
							marginBottom: 0,
						}
					}
				})
			}

            /*
            Update position of menu while scrolling
            */
			const menu_top = this.stickyBox.current.getBoundingClientRect().bottom;
			this.setState((prevState) => {
				return {
					menu: {
						...prevState.menu,
						top: menu_top,
					}
				}
			})
		}
	}

	handleLogin = (e) => {
		this.setState((prevState) => {
			return ({
				isLoggedIn: !prevState.isLoggedIn,
			});
		});
	}

    /*
    Should only be called when window is clicked and menu is open
    */
	handleClick = (e) => {
		if (this.menu.current) {
			if (this.menu.current.contains(e.target)) {
				//Click is inside menu
			} else {
				//Click is outside menu
				//Despawn menu
				this.setState((prevState) => {
					return {
						menu: {
							...prevState.menu,
							isOpen: false,
						}
					}
				});
				//Stop listening to clicking
				setTimeout(() => {
					window.removeEventListener("click", this.handleClick);
				}, 0);
			}
		}
	}

    /*
    Should only be called when menu button is pressed
    */
	handleClickMenu = () => {
		//Toggle listening to clicking
		if (!this.state.menu.isOpen) {
			setTimeout(() => {
				window.addEventListener("click", this.handleClick);
			}, 0);
		} else {
			setTimeout(() => {
				window.removeEventListener("click", this.handleClick);
			}, 0);
		}

		//Toggle spawn/despawn menu
		this.setState((prevState) => {
			return {
				menu: {
					...prevState.menu,
					isOpen: !prevState.menu.isOpen,
				}
			}
		});
	}

	render() {
		const menu_top = (this.state.menu.top)
			? this.state.menu.top
			: (typeof window !== 'undefined' && this.stickyBox.current)
				? this.stickyBox.current.getBoundingClientRect().bottom
				: 0;
		return (
			<>
				<div
					ref={this.menu}
					style={{
						position: "relative",
						zIndex: 100,
					}}
				>
					<Menu
						isOpen={this.state.menu.isOpen}
						handler={this.handleClickMenu}
						style={{
							top: menu_top,
							margin: "1.2rem",
						}}
					/>
				</div>
				<div style={{
					position: "relative",
					zIndex: 100,
				}}>
					<div
						ref={this.languageBar}
						style={{
							position: "relative",
							display: "flex",
							backgroundColor: colors.soft.bg,
							justifyContent: "flex-end",
							paddingTop: "0.5em",
							paddingLeft: "1em",
							paddingRight: "1em",
							zIndex: 200,
						}}
					>
						<AccountButton isLoggedIn={this.state.isLoggedIn} onClick={this.handleLogin} />
					</div>
					<div
						ref={this.substituteBox}
						style={this.state.substituteBoxStyle}
					/>
					<div
						ref={this.stickyBox}
						style={this.state.stickyBoxStyle}
					>
						<SmartLink
							href="/"
							noStyle={true}
							style={{
								flex: "0.7",
								textAlign: "left",
								fontSize: "1.8em",
								textDecoration: "none",
								color: "inherit",
							}}
						>
							<img src={require('../assets/send-softblue.svg')} height="35" />
							{` `}{` `}
							{meta.name}
						</SmartLink>
						<span style={{
							flex: "0.5",
							textAlign: "center",
						}}>
							<Button menuHandleClick={this.handleClickMenu}>
								<img src={require('../assets/menu-softblue.svg')} height="36" />
							</Button>
						</span>
						<span style={{
							flex: "1",
							display: "flex",
							justifyContent: "space-between",
						}}>
							<SmartLink href='/explore'>
								Explore
                        	</SmartLink>
							<SmartLink href='./book'>
								Book
                        	</SmartLink>
							<SmartLink href='./AeroPoints'>
								AeroPoints
                        	</SmartLink>
						</span>
						<span style={{
							flex: "0.2",
							textAlign: "left",
						}} />
					</div>
				</div>
			</>
		)
	}
}

export default Header;