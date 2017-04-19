// std library imports
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// node_modules imports
import Rnd from 'react-rnd';

// app imports
import { addAddon, getAddons } from './actions/addons'
import CurrentAddons from './components/CurrentAddons'
import Photo from './components/Photo'
import Drawers from './components/Drawers'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { webcamActive: false };
    setTimeout(() => this.setState({ zIndex: 1000 }), 5000);
    this.handleClick = this.handleClick.bind(this)
    this.handleSteven = this.handleSteven.bind(this)
    this.toggleWebcam = this.toggleWebcam.bind(this)
    this.handleEmoji = this.handleEmoji.bind(this)
    this.handleText = this.handleText.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.props.getAddons()
  }

  handleClick() {
    this.props.addAddon(this.props.addonLibrary[0].addons[Math.floor(Math.random() * this.props.addonLibrary[0].addons.length - 1)])
  }

  handleSteven() {
    this.props.addAddon(this.props.addonLibrary[2].addons[0])
  }

  handleEmoji() {
    this.props.addAddon(this.props.addonLibrary[1].addons[Math.floor(Math.random() * this.props.addonLibrary[0].addons.length)])
  }

  handleText() {
    this.props.addAddon({
      initial_height: 100,
      initial_width: 200,
      url: "https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-ultralight-webfont.woff",
      category: 'text'
    })
  }

  toggleWebcam(){
    this.setState({
      webcamActive: !this.state.webcamActive
    })
  }

  handleToggle() {
    this.setState({
      webcamActive: false
    })
  }

  render() {
    const divStyle = {
      height: '10000px'
    }
    return (
      <div className="app">
        <div className="btn-bar">
          <button className="btn" onClick={this.handleClick}>Add Mustache</button>
          <button className="btn" onClick={this.handleSteven}>STEVEN ME</button>
          <button className="btn" onClick={this.toggleWebcam}>WEBCAM {this.state.webcamActive ? 'OFF' : 'ON' }</button>
          <button className="btn" onClick={this.handleEmoji}>Add Emoji</button>
          <button className="btn" onClick={this.handleText}>Add Text</button>
        </div>
        <Drawers />
        <CurrentAddons />
        {this.state.webcamActive ? <Photo handleToggle={this.handleToggle} /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usedAddons: state.Addon,
    addonLibrary: state.AddonLibrary
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addAddon: addAddon,
    getAddons: getAddons
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
