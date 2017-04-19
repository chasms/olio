import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import Draggable from 'react-draggable';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addText, removeText, saveTextLocation } from '../actions/texts'

class CurrentText extends Component{

render(){
	return(
		 <div>
          <TextareaAutosize
          	id={this.props.text.id}
          	key={this.props.text.id}
          	initial={{x: 0, y: 0, width: 300, height: 300}}
            maxRows={3}
            style={{top: 0, left: 0, lineHeight: 1, fontSize: 10, border: 0, boxSizing: 'border-box'}}
            />
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