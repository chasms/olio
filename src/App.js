// std library imports
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// node_modules imports
import Rnd from 'react-rnd';
import Modal from 'react-modal';

// app imports
import { addAddon, getAddons, deleteAllAddons } from './actions/addons'
import { saveCreation, restoreCreation, getCreations } from './actions/creations'
import { getDrawers } from './actions/drawers'
import { checkIfLoggedIn, logout } from './actions/accounts'
import CurrentAddons from './components/CurrentAddons'
import Photo from './components/Photo'
import Drawers from './components/Drawers'
import Signup from './components/Signup'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      webcamActive: false,
      signupModalOpen: true,
      restoreId: ''
    };
    this.props.getDrawers()
    this.props.getAddons()
    this.props.checkIfLoggedIn()
    this.handleClick = this.handleClick.bind(this)
    this.toggleWebcam = this.toggleWebcam.bind(this)
    this.handleText = this.handleText.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleRestore = this.handleRestore.bind(this)
    this.toggleSignupModel = this.toggleSignupModel.bind(this)
    this.handleIdChange = this.handleIdChange.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.renderRestoreInput = this.renderRestoreInput.bind(this)
  }

  handleSave() {
    this.props.saveCreation(this.props.usedAddons, this.props.token)
  }

  handleClick() {
    this.props.addAddon(this.props.addonLibrary[0].addons[Math.floor(Math.random() * this.props.addonLibrary[0].addons.length - 1)])
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

  handleRestore() {
    this.props.restoreCreation(this.state.restoreId, this.props.token)
  }

  handleIdChange(e) {
    let int = parseInt(e.target.value, 10)
    this.setState({
      restoreId: e.target.value
    })
  }

  handleLogout() {
    this.props.logout()
    this.props.deleteAllAddons()
  }

  renderSaveButton() {
    return this.props.token ? <button className="btn" onClick={this.handleSave}>Save Creation</button> : null
  }

  renderRestore() {
    return this.props.token ? <button className="btn" onClick={this.handleRestore}>Restore</button> : null
  }

  renderRestoreInput() {
    return this.props.token ? <input type='number' onChange={this.handleIdChange} value={this.state.restoreId}/> : null
  }

  renderLogout() {
    return this.props.token ? <button className="btn" onClick={this.handleLogout}>Log Out</button> : null
  }

  renderSignup() {
    return !this.props.token ? <button className="btn" onClick={this.toggleSignupModel}>Sign Up</button> : null
  }

  componentWillMount() {
    this.props.token ? this.setState({ signupModalOpen: false }) : null
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
          {this.renderSaveButton()}
          <button className="btn" onClick={this.toggleWebcam}>WEBCAM {this.state.webcamActive ? 'OFF' : 'ON' }</button>
          <button className="btn" onClick={this.handleText}>Add Text</button>
          {this.renderSignup()}
          {this.renderRestore()}
          {this.renderRestoreInput()}
          {this.renderLogout()}



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
      addonLibrary: state.AddonLibrary,
      creations: state.Creations
    }
  }


  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      deleteAllAddons: deleteAllAddons,
      checkIfLoggedIn: checkIfLoggedIn,
      logout: logout,
      saveCreation: saveCreation,
      addAddon: addAddon,
      getAddons: getAddons,
      getDrawers: getDrawers,
      restoreCreation: restoreCreation
    }, dispatch);
  }


  export default connect(mapStateToProps, mapDispatchToProps)(App)
