// std library imports
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// node_modules imports
import Sidebar from 'react-sidebar'
import Modal from 'react-modal'
var Spinner = require('react-spinkit')
import Notifications from 'react-notification-system-redux';

// app imports
import { addAddon, getAddons, deleteAllAddons } from './actions/addons'
import { success, show, error } from './actions/notifications'
import { saveCreation, restoreCreation, getCreations, deleteCreation } from './actions/creations'
import { getDrawers } from './actions/drawers'
import { checkIfLoggedIn, logout } from './actions/accounts'
import CurrentAddons from './components/CurrentAddons'
import Drawers from './components/Drawers'
import NavBar from './components/NavBar'
import Delete from './components/Delete'
import Welcome from './components/Welcome'
import Photo from './components/Photo'
import SignUp from './components/Signup'
import Login from './components/Login'
import AppModal from './components/AppModal'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      welcomeModalOpen: true,
      webcamActive: false,
			signupModalOpen: false,
			loginModalOpen: false,
			saveModalOpen: false
    };
    this.props.getDrawers()
    this.props.getAddons()
    this.props.checkIfLoggedIn()
    this.props.token ? this.props.getCreations(this.props.token) : null
    this.handleSidebar = this.handleSidebar.bind(this)
    this.toggleWelcomeModal = this.toggleWelcomeModal.bind(this)
    this.handleRestoreCreation = this.handleRestoreCreation.bind(this)
    this.toggleWebcamModal = this.toggleWebcamModal.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.toggleSignupModal = this.toggleSignupModal.bind(this)
    this.toggleLoginModal = this.toggleLoginModal.bind(this)
    this.toggleSaveModal = this.toggleSaveModal.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }
  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  handleSave() {
    this.closeModal()
    this.props.saveCreation(this.props.usedAddons, this.props.token)
  }

  toggleSaveModal() {
    this.setState({
      saveModalOpen: !this.state.saveModalOpen
    })
  }

  closeModal() {
    this.setState({
      signupModalOpen: false,
      loginModalOpen: false,
      saveModalOpen: false,
      webcamActive: false
    })
  }

  toggleWebcamModal(){
    this.setState({
      webcamActive: !this.state.webcamActive
    })
  }

  toggleSignupModal(){
    if (this.state.loginModalOpen) {
      this.setState({
        loginModalOpen: false
      })
    }
    this.setState({
      signupModalOpen: !this.state.signupModalOpen
    })
  }

  toggleLoginModal(){
    if (this.state.signupModalOpen) {
      this.setState({
        signupModalOpen: false
      })
    }
    this.setState({
      loginModalOpen: !this.state.loginModalOpen
    })
  }

  handleLogout() {
    this.props.logout()
    this.props.deleteAllAddons()
  }

  handleKeyDown(e) {
    if (e.ctrlKey && e.which === 87) {
      this.toggleWebcamModal()
    } else if (e.ctrlKey & e.which === 83) {
      this.toggleSaveModal()
    }

  }

  toggleWelcomeModal() {
    this.setState ({
      welcomeModalOpen: false
    })
  }

  handleSidebar() {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    })
    // this.props.restoreCreation(this.state.restoreId, this.props.token)
  }


  renderWelcomeModal() {

      let customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          backgroundColor       : 'whitesmoke'
        },
        overlay : {
          zIndex          : '10000'
        }
      }
      return (
        <Modal
          isOpen={this.state.welcomeModalOpen}
          contentLabel="Welcome"
          style={customStyles}>
          <Welcome />
            {this.props.loading ? <div className="ride-spinners"><Spinner spinnerName='double-bounce' /></div> : <button className="closeModal" onClick={this.toggleWelcomeModal}>close</button>}
        </Modal>
      )
    }


  renderCreationList() {
    return this.props.creations.map((creation) => {
      return (
        <div
          className="creation non-selectable"
          key={creation.id}
        >
          <Delete
            onClick={this.props.deleteCreation.bind(null, creation.id, this.props.token)}
            className="creation-delete"
            flashClass="creation-flash"
          />
          <span
            className='creation-restore'
            onClick={this.handleRestoreCreation.bind(null, creation.id, this.props.token)}
          >restore</span>
          <h3>
          {creation.title ? creation.title : 'Creation #' + creation.id}
          </h3>
        </div>
      )
    })
  }

  handleRestoreCreation(id, token) {
    this.handleSidebar()
    this.props.restoreCreation(id, token)
  }
  render() {
    return (
      <div className="app" onKeyDown={this.handleKeyDown}>


        <NavBar handleSidebar={this.handleSidebar} handleSave={this.handleSave} toggleLoginModal={this.toggleLoginModal} toggleSaveModal={this.toggleSaveModal} toggleSignupModal={this.toggleSignupModal} handleLogout={this.handleLogout} toggleWebcamModal={this.toggleWebcamModal} webcamActive={this.state.webcamActive} toggleLoginModal={this.toggleLoginModal} />
        <AppModal handleSave={this.handleSave} webcamActive={this.state.webcamActive} loginModalOpen={this.state.loginModalOpen} signupModalOpen={this.state.signupModalOpen} saveModalOpen={this.state.saveModalOpen} handleSave={this.handleSave} closeModal={this.closeModal} handleLogout={this.handleLogout} handleKeyDown={this.handleKeyDown} />
        <Drawers loading={this.toggleWelcomeModal}/>
=======
        <NavBar handleSidebar={this.handleSidebar}/>
        <Drawers />

        <CurrentAddons />
        <Sidebar sidebar={this.renderCreationList()}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          children=''
          pullRight
          overlayClassName='creations-overlay'
          sidebarClassName='creations-bar'
        />
        {this.renderWelcomeModal()}
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      loading: state.Loading,
      token: state.Accounts.token,
      usedAddons: state.Addon,
      addonLibrary: state.AddonLibrary,
      creations: state.Creations
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      getCreations: getCreations,
      deleteCreation: deleteCreation,
      deleteAllAddons: deleteAllAddons,
      checkIfLoggedIn: checkIfLoggedIn,
      logout: logout,
      saveCreation: saveCreation,
      addAddon: addAddon,
      getAddons: getAddons,
      getDrawers: getDrawers,
      restoreCreation: restoreCreation,

      success: success,
			error: error
    }, dispatch);
  }

  export default connect(mapStateToProps, mapDispatchToProps)(App)
