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
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleScreenshot() {

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
      this.handleScreenshot()
    }
  }

  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }



  render() {
    return (
      <div>
        <div className="photobox">
          <h3>Press the space bar to take a picture</h3>
          <Webcam ref="webcam" height={"400"} width={"400"}/>
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
