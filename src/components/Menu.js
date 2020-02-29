import React from 'react'

import colors from '../colors.json'
import SmartLink from './SmartLink'

const Menu = (props) => {
    const translateX_percent = props.isOpen ? 0 : -130;

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
			backgroundColor: colors.soft.bg,
			borderRadius: "12px",
			boxShadow: `6px 6px 16px #888D91b0`,
            height: "15em",
            textAlign: "left",
            padding: "2rem",
            position: "fixed",
            top: 0,
            left: 0,
            transition: "transform 0.3s ease-in-out",
            transform: `translateX(${translateX_percent}%)`,
            ...props.style,
        }}>
            <SmartLink href="/status" onClick={props.handler}>
                Status
            </SmartLink>
            <SmartLink href="/careers" onClick={props.handler}>
                Careers
            </SmartLink>
            <SmartLink href="/fbla" onClick={props.handler}>
                Contact
            </SmartLink>
            <SmartLink href="/legal" onClick={props.handler}>
                Legal
            </SmartLink>
        </div>
    )
}
export default Menu;