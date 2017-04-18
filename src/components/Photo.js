import React from 'react'
import Webcam from 'react-webcam';
import { addAddon } from '../actions/addons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Photo extends React.Component {
  constructor() {
    super()
    this.state = {
      screenshot: null
    }
    this.handleScreenshot = this.handleScreenshot.bind(this)
  }

  handleScreenshot() {
    this.props.addAddon({
      url: this.refs.webcam.getScreenshot(),
      initial_height: 300,
      initial_width: 400
    })
    this.props.handleToggle()
  }
  render() {
    return (
      <div>



        <div className="photobox">
          <button onClick={this.handleScreenshot}>TAKE SCREENSHOT</button>
          <Webcam ref="webcam" height={"400"} width={"400"}/>
          <img id='screenshot' src={this.state.screenshot} />
        </div>
      </div>

    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addAddon: addAddon
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Photo)
