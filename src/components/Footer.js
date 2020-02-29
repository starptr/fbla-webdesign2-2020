import React from 'react'
import { SocialIcon } from 'react-social-icons';

import colors from '../colors.json'
import SmartLink from './SmartLink.js';

class Footer extends React.Component {
	render() {
		return (
			<div style={{
				backgroundColor: colors.soft.bg,
				width: "100%",
			}}>
				<hr style={{
					border: `0.5px solid ${colors.soft.shadowDown}`,
				}} />
				<div style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					paddingTop: "2em",
					paddingBottom: "2em",
				}}>
					<div style={{
						display: "flex",
						width: "50%",
						justifyContent: "space-evenly",
						marginTop: "1em",
						marginBottom: "1em",
					}}>
						<SmartLink noStyle={true} href="/fbla">
							<SocialIcon network="email" />
						</SmartLink>
						<SmartLink noStyle={true} href="/fbla">
							<SocialIcon network="twitter" />
						</SmartLink>
						<SmartLink noStyle={true} href="/fbla">
							<SocialIcon network="yelp" />
						</SmartLink>
						<SmartLink noStyle={true} href="/fbla">
							<SocialIcon network="instagram" />
						</SmartLink>
						<SmartLink noStyle={true} href="/fbla">
							<SocialIcon network="facebook" />
						</SmartLink>
						<SmartLink noStyle={true} href="/fbla">
							<SocialIcon network="youtube" />
						</SmartLink>
						<SmartLink noStyle={true} href="/fbla">
							<SocialIcon network="rss" />
						</SmartLink>
					</div>
					<small style={{
						textAlign: "center",
					}}>
						© {new Date().getFullYear()} AeroWay Air Lines, Inc.
                	</small>
				</div>
			</div>
		);
	}
}

export default Footer;