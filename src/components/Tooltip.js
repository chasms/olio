// std library imports
import React, { Component } from 'react'

// node_modules imports
import ReactTooltip from 'react-tooltip'


export default class Tooltip extends Component {

	render(){
		return(
			<div className="tooltip">

				<img data-tip className="keyboard-img" src="http://chas.ms/olio/keyboard.png" />
					<ReactTooltip place="bottom" type="dark" effect="float">
						<p>Webcam: ctrl + w</p>
						<p>Take picture: space</p>
						<p>Add text: ctrl + t</p>
						<p>Save: ctrl + s</p>
						<p>Delete: ctrl + d</p>
					</ReactTooltip>
			</div>
		)
	}
}
