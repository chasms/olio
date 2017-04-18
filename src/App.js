
import React from 'react';
import Rnd from 'react-rnd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addAddon, getAddons } from './actions/addons'
import { addText } from './actions/texts'
import CurrentAddons from './components/CurrentAddons'
import Photo from './components/Photo'
import Drawers from './components/Drawers'




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { zIndex: 99, webcamActive: false };
    setTimeout(() => this.setState({ zIndex: 1000 }), 5000);
    this.handleClick = this.handleClick.bind(this)
    this.handleSteven = this.handleSteven.bind(this)
    this.toggleWebcam = this.toggleWebcam.bind(this)
    this.handleEmoji = this.handleEmoji.bind(this)
    this.handleText = this.handleText.bind(this)
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
  handleText() {
    this.props.addText()
  }

  toggleWebcam(){
    this.setState({
      webcamActive: !this.state.webcamActive
    })
  }



  render() {
    const divStyle = {
      height: '10000px'
    }
    return (
      <div style={divStyle}>
        <button onClick={this.handleClick}>Add Mustache</button>
        <button onClick={this.handleSteven}>STEVEN ME</button>
        <button onClick={this.toggleWebcam}>WEBCAM ON OR OFF</button>
        <button onClick={this.handleEmoji}>Add Emoji</button>
        <button onClick={this.handleText}>Add Text</button>
        <CurrentAddons zIndex={this.state.zIndex} />
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
    getAddons: getAddons,
    addText: addText
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
