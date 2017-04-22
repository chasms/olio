// std library imports
import React from 'react'
import { addAddon } from '../actions/addons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// node_modules imports
import Webcam from 'react-webcam';

class Photo extends React.Component {
  constructor() {
    super()
    this.state = {
      screenshot: null
    }
    this.handleScreenshot = this.handleScreenshot.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleScreenshot() {
    document.getElementsByClassName("workspace")[0].focus()
    this.props.addAddon({
      url: this.refs.webcam.getScreenshot(),
      initial_height: 300,
      initial_width: 400,
      category: 'photo'
    })
    this.props.handleToggle()

  }

  handleKeyDown(e){
    if (e.which == 32) {
      e.preventDefault()
      this.handleScreenshot()
    }
  }

  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }



  render() {
    return (
      <div>
        <div className="photobox">
          <Webcam className="webcam" ref="webcam" width={"400"} height={"400"}/>
          <p>Hit the spacebar to take a picture</p>
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
