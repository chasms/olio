// std library imports
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// node_modules imports
import Rnd from 'react-rnd';
import Modal from 'react-modal';

// app imports
import { addAddon, getAddons } from './actions/addons'
import { saveCreation } from './actions/creations'
import { getDrawers } from './actions/drawers'
import CurrentAddons from './components/CurrentAddons'
import Photo from './components/Photo'
import Drawers from './components/Drawers'
import Signup from './components/Signup'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      webcamActive: false,
      signupModalOpen: false
    };
    this.state = { webcamActive: false };
    this.props.getDrawers()
    this.props.getAddons()
    this.handleClick = this.handleClick.bind(this)
    this.handleSteven = this.handleSteven.bind(this)
    this.toggleWebcam = this.toggleWebcam.bind(this)
    this.handleEmoji = this.handleEmoji.bind(this)
    this.handleText = this.handleText.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.toggleSignupModel = this.toggleSignupModel.bind(this)
    this.props.getAddons()
  }

  handleSave() {
    this.props.saveCreation(this.props.usedAddons, this.props.token)
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

  toggleSignupModel(){
    this.setState({
      signupModalOpen: !this.state.signupModalOpen
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

    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };
    return (
      <div className="app">
        <div className="btn-bar">
          <button className="btn" onClick={this.handleSave}>Save Creation</button>
          <button className="btn" onClick={this.handleClick}>Add Mustache</button>
          <button className="btn" onClick={this.handleSteven}>STEVEN ME</button>
          <button className="btn" onClick={this.toggleWebcam}>WEBCAM {this.state.webcamActive ? 'OFF' : 'ON' }</button>
          <button className="btn" onClick={this.handleEmoji}>Add Emoji</button>
          <button className="btn" onClick={this.handleText}>Add Text</button>
          <button className="btn" onClick={this.toggleSignupModel}>Sign Up</button>

        </div>
        <Modal
          isOpen={this.state.signupModalOpen}
          contentLabel="Sign Up"
          style={customStyles}
          >
            <Signup />
          </Modal>
          <Drawers />
          <CurrentAddons />
          {this.state.webcamActive ? <Photo handleToggle={this.handleToggle} /> : null}
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      token: state.Accounts.token,
      usedAddons: state.Addon,
      addonLibrary: state.AddonLibrary
    }
  }


  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      saveCreation: saveCreation,
      addAddon: addAddon,
      getAddons: getAddons,
      getDrawers: getDrawers
    }, dispatch);
  }


  export default connect(mapStateToProps, mapDispatchToProps)(App)
