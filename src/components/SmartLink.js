import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
	Link,
	NavLink,
    useRouteMatch
} from "react-router-dom"

export default class SmartLink extends React.Component {
    render() {
		const isButtonStyle = !this.props.noStyle;
        return (
            <span className={ isButtonStyle ? "link" : null}>
                <Link
					to={this.props.href}
					style={{
						...this.props.style
					}}
					target={this.props.target}
					onClick={this.props.onClick}
				>
                    {this.props.children}
                </Link>
            </span>
        )
    }
}