// std library imports
import React, { Component } from 'react'
import { connect } from 'react-redux'

// node_modules imports
import ReactTooltip from 'react-tooltip'


class Tooltip extends Component {

renderToolTip() {
	return !this.props.token ? <ReactTooltip place="bottom" type="dark" effect="float"><p>Webcam: ctrl + w</p><p>Take picture: space</p><p>Add text: ctrl + t</p><p>Delete: ctrl + d</p><p>SignUp or Login to save!</p></ReactTooltip> : <ReactTooltip place="bottom" type="dark" effect="float"><p>Webcam: ctrl + w</p><p>Take picture: space</p><p>Add text: ctrl + t</p><p>Delete: ctrl + d</p><p>Save: ctrl + s</p></ReactTooltip>

}

	render(){
		return(
			<div className="tooltip">
				<img data-tip className="keyboard-img" src="http://chas.ms/olio/keyboard.png" alt='keyboard shortcuts' />
				{this.renderToolTip()}		
			</div>
		)
	}
}
const mapStateToProps = (state) => {
    return {
      token: state.Accounts.token
    }
}

export default connect(mapStateToProps)(Tooltip)
