import React, { Component } from 'react'
import Rnd from 'react-rnd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addAddon, getAddons } from './actions/addons'
import CurrentAddons from './components/CurrentAddons'
import Photo from './components/Photo'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { zIndex: 99, webcamActive: false};
    setTimeout(() => this.setState({ zIndex: 1000 }), 5000);
    this.handleClick = this.handleClick.bind(this)
    this.handleSteven = this.handleSteven.bind(this)
    this.toggleWebcam = this.toggleWebcam.bind(this)
    this.handleEmoji = this.handleEmoji.bind(this)
    this.props.getAddons()
  }

  handleClick() {
    this.props.addAddon(this.props.allAddons[Math.floor(Math.random() * this.props.allAddons.length - 1)])
  }
  handleSteven() {
    this.props.addAddon(this.props.allAddons[12])
  }
  handleEmoji() {
    this.props.addAddon(this.props.allAddons[Math.floor(Math.random() * this.props.allAddons.length - 1)])
  }

  toggleWebcam(){
    this.setState({
      webcamActive: !this.state.webcamActive
    })
  }

  render() {
    return (
      <div className="workspace">
        <button onClick={this.handleClick}>Add Mustache</button>
        <button onClick={this.handleSteven}>STEVEN ME</button>
        <button onClick={this.toggleWebcam}>WEBCAM ON OR OFF</button>
        <button onClick={this.handleEmoji}>Add Emoji</button>
        <CurrentAddons zIndex={this.state.zIndex} />
        <Drawers />
        {this.state.webcamActive ? <Photo /> : null}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    usedAddons: state.Addon,
    allAddons: state.AddonLibrary
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addAddon: addAddon,
    getAddons: getAddons
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
