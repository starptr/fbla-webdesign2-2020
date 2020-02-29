import React from 'react'

export default class AccountButton extends React.Component {
    render() {
        return (
            <div className="pointerOnHover" onClick={this.props.onClick}>{this.props.isLoggedIn ? "Welcome, Fbla Judge." : "Sign In | Join"}</div>
        )
    }
}