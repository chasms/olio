
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
      <div className="workspace">
        <div className="btn-bar">
          <button className="btn" onClick={this.handleClick}>Add Mustache</button>
          <button className="btn" onClick={this.handleSteven}>STEVEN ME</button>
          <button className="btn" onClick={this.toggleWebcam}>WEBCAM ON OR OFF</button>
          <button className="btn" onClick={this.handleEmoji}>Add Emoji</button>
          <button className="btn" onClick={this.handleText}>Add Text</button>
        </div>
        <Drawers />
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
