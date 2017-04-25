import React from 'react'

export default class WebcamButton extends React.Component{

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
