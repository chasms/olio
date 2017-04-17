import React from 'react'
import Webcam from 'react-webcam';

export default class Photo extends React.Component {
  render() {
    return (
      <div className="photobox"> 
        <Webcam ref="webcam" height={"200"} width={"200"}/>
      </div>

    )
  }
}