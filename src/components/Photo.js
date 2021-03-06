// std library imports
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// node_modules imports
import Webcam from 'react-webcam';

// app imports
import { closeAllModals } from '../actions/modals'
import { addAddon } from '../actions/addons'

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


  }

  handleKeyDown(e){
    if (e.which === 32) {
      e.preventDefault()
      this.handleScreenshot()
      this.props.closeAllModals()

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
      <div className="photobox">
        <Webcam className="webcam" ref="webcam" width={"640"} height={"480"} audio={false}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    closeAllModals: closeAllModals,
    addAddon: addAddon
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Photo)
