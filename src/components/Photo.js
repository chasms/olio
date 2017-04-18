import React from 'react'
import Webcam from 'react-webcam';

export default class Photo extends React.Component {
  constructor() {
    super()
    this.state = {
      screenshot: null
    }
    this.handleScreenshot = this.handleScreenshot.bind(this)
  }

  handleScreenshot() {
    this.setState({
      screenshot: this.refs.webcam.getScreenshot()
    })
  }
  render() {
    return (
      <div className="photobox">
        <Webcam ref="webcam" height={"400"} width={"400"}/>
        <button onClick={this.handleScreenshot}>TAKE SCREENSHOT</button>
        <img id='screenshot' src={this.state.screenshot} />
      </div>

    )
  }
}
