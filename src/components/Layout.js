import React from 'react'

import meta from '../meta.json'
import colors from '../colors.json'
import Head from './Head'
import Header from './Header'
import Footer from './Footer'

class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//lang: this.props.lang || '',
			lang: "en",
			title: meta.name,
			description: this.props.description,
			spaceHeight: 0,
		}

		this.contentRef = React.createRef();
		this.spaceRef = React.createRef();
		this.footerRef = React.createRef();
	}

	render() {
		return (
			<>
				<div style={{
					color: "black",
					backgroundColor: colors.soft.bg,
				}}>
					<Head title={this.state.title} description={this.state.description} />
					<div ref={this.contentRef}>
						<Header isTitle={false} menuHandleClick={this.handleClickMenu} />
						<div style={{
							maxWidth: "80rem",
							margin: "0 auto",
						}}>
							{this.props.children}
						</div>
					</div>
					<div ref={this.spaceRef} style={{
						height: this.state.spaceHeight,
					}} />
					<div ref={this.footerRef}>
						<Footer />
					</div>
					<style jsx global>{`
                        ${!this.state.lang || this.state.lang === "en" || this.state.lang === "es" ? '@import url(https://fonts.googleapis.com/css?family=Open+Sans&display=swap);' : ''}
                        ${this.state.lang === "jp" || this.state.lang === "zhs" || this.state.lang === "zht" ? '@import url(https://fonts.googleapis.com/css?family=Noto+Sans&display=swap);' : ''}
                        ${this.state.lang === "jp" ? '@import url(https://fonts.googleapis.com/css?family=Noto+Sans+JP&display=swap);' : ''}
                        ${this.state.lang === "zhs" ? '@import url(https://fonts.googleapis.com/css?family=Noto+Sans+SC&display=swap);' : ''}
                        ${this.state.lang === "zht" ? '@import url(https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap);' : ''}

                        body {
                            margin: 0;
                            font-family: ${ !this.state.lang || this.state.lang === "en" || this.state.lang === "es"
							? `"Open Sans", Helvetica, Arial, sans-serif`
							: this.state.lang === "jp"
								? `"Noto Sans", "Noto Sans JP", sans-serif`
								: this.state.lang === "zhs"
									? `"Noto Sans", "Noto Sans SC", sans-serif`
									: this.state.lang === "zht"
										? `"Noto Sans", "Noto Sans TC", sans-serif`
										: `sans-serif`};
                        }
                    `}</style>
				</div>
			</>
		)
	}
}

export default Layout;