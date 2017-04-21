import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'


export default class Tooltip extends Component { 

	render(){
		return(
			<div className="tooltip">
				<img className="keyboard-img" data-tip="React-tooltip" src="http://chas.ms/olio/keyboard.png" />
				<ReactTooltip place="bottom" type="dark" effect="float"/>
			</div>
		)
	}
}