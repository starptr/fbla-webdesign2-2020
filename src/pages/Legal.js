import React from 'react'

class Legal extends React.Component {
	render() {
		return (
			<div style={{
				display: "flex",
				flexDirection: "column",
				margin: "2rem",
			}}>
				<b style={{
					fontSize: "2rem",
					textAlign: "center",
				}}>
					Legal
				</b>
				<br />
				All media used in this project are free for commercial use.
				Credits for stock photos:

				<ul>
					<li>Ishan @seefromthesky on Unsplash</li>
					<li>Jakob Owens on Unsplash</li>
					<li>Oliver Sjöström on Unsplash</li>
					<li>Nadi Whatisdelirium on Unsplash</li>
					<li>Jonatan Pie on Unsplash</li>
					<li>Ahmad Kadhim on Unsplash</li>
					<li>Video by Simplehada Studio from Pexels</li>
					<li>Daniil Vnoutchkov on Unsplash</li>
					<li>MILKOVÍ on Unsplash</li>
					<li>Tyler Nix on Unsplash</li>
					<li>Image by Stela Di from Pixabay</li>
					<li>Jay Wennington on Unsplash</li>
					<li>Duy Pham on Unsplash</li>
				</ul>

				External libraries used:

				<ul>
					<li>React by Facebook</li>
				</ul>
				<div style={{
					paddingTop: "10rem",
				}} />
			</div>
		)

	}
}

export default Legal;