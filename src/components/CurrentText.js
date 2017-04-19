import React, { Component } from 'react';
import Rnd from 'react-rnd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addText, removeText, saveTextLocation } from '../actions/texts'

class CurrentText extends Component{

	renderTextAreas() {
		this.props.text.map( text => {
			<Rnd
				id={text.id}
				key={text.id}
				maxRows={3}
				style={{top: 0, left: 0, lineHeight: 1, fontSize: 10, border: 0, boxSizing: 'border-box'}}
			/>
		})
	}

	render(){
		return(
			<div className="text-container">

			</div>
		)
	}

}

const mapStateToProps = (state) => {
	return {
		text: state.Text
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		removeText: removeText,
		saveTextLocation: saveTextLocation
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentText)
