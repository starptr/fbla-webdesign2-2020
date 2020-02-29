import React from 'react'
import { Redirect } from 'react-router-dom'

const ErrorMsg = (props) => {
	return (
		<small style={{
			color: "red",
		}}>
			{props.children}
		</small>
	)
}

export default ErrorMsg;