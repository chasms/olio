// std library imports
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// app imports
import {
  toggleWebcamModal,
  closeAllModals
} from '../actions/modals'


class WebcamButton extends React.Component{

  render() {
    return (
      <div className="nav-button">
        <img
          alt=''
          src="http://chas.ms/olio/webcam.svg"
          className={'webcam-button' + (this.props.webcamActive ? ' webcam-active' : '') }
          onClick={this.props.toggleWebcamModal}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleWebcamModal: toggleWebcamModal,
    closeAllModals: closeAllModals
  }, dispatch);
}

const mapStateToProps = (state) => {
  return {
    webcamActive: state.Modals.webcam
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WebcamButton)
