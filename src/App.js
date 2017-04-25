// std library imports
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// node_modules imports
import Modal from 'react-modal'
var Spinner = require('react-spinkit')

// app imports
import { addAddon, getAddons, deleteAllAddons } from './actions/addons'
import { success, error } from './actions/notifications'
import { saveCreation, restoreCreation, getCreations, deleteCreation } from './actions/creations'
import { getDrawers } from './actions/drawers'
import { checkIfLoggedIn, logout } from './actions/accounts'
import { toggleWebcamModal } from './actions/modals'
import CurrentAddons from './components/CurrentAddons'
import Drawers from './components/Drawers'
import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'
import Delete from './components/Delete'
import Welcome from './components/Welcome'
import AppModal from './components/AppModal'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      welcomeModalOpen: true,
    };
    this.props.getDrawers()
    this.props.getAddons()
    this.props.checkIfLoggedIn()
    if (this.props.token) { this.props.getCreations(this.props.token) }
    this.handleSidebar = this.handleSidebar.bind(this)
    this.toggleWelcomeModal = this.toggleWelcomeModal.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }
  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  handleSave() {
    this.closeModal()
    this.props.saveCreation(this.props.usedAddons, this.props.token)
  }


  handleLogout() {
    this.props.logout()
    this.props.deleteAllAddons()
  }

  handleKeyDown(e) {
    if (e.ctrlKey && e.which === 87) {
      this.props.toggleWebcamModal()
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

  renderSaveButton() {
		return this.props.token ? <button className="btn" onClick={this.toggleSaveModal}>Save Creation</button> : null
	}

	renderLogout() {
		return this.props.token ? <button className="btn" onClick={this.handleLogout}>Log Out</button> : null
	}

	renderSignup() {
		return !this.props.token ? <button className="btn" onClick={this.toggleSignupModal}>Sign Up</button> : null
	}

	renderLogin() {
		return !this.props.token ? <button className="btn" onClick={this.toggleLoginModal}>Login</button> : null
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
          zIndex          : '1000px'
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
          key={creation.id} >
          <Delete
            onClick={this.props.deleteCreation.bind(null, creation.id, this.props.token)}
            className="creation-delete"
            flashClass="creation-flash" />
          <span
            className='creation-restore'
            onClick={this.handleRestoreCreation.bind(null, creation.id, this.props.token)}>
            restore
          </span>
          <h3> {creation.title ? creation.title : 'Creation #' + creation.id} </h3>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="app" onKeyDown={this.handleKeyDown}>
        <NavBar
          sidebarOpen={this.state.sidebarOpen}
          handleSidebar={this.handleSidebar}
          handleSave={this.handleSave}
          handleLogout={this.handleLogout} />
        <AppModal
          handleSave={this.handleSave}
          handleLogout={this.handleLogout}
          handleKeyDown={this.handleKeyDown} />
        <Drawers loading={this.toggleWelcomeModal}/>
        <CurrentAddons />
        <Sidebar
          sidebarOpen={this.state.sidebarOpen}
          handleLogout={this.handleLogout}
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
      saveCreation: saveCreation,
      deleteCreation: deleteCreation,
      restoreCreation: restoreCreation,
      toggleWebcamModal: toggleWebcamModal,
      addAddon: addAddon,
      getAddons: getAddons,
      deleteAllAddons: deleteAllAddons,
      getDrawers: getDrawers,
      checkIfLoggedIn: checkIfLoggedIn,
      logout: logout,
      success: success,
			error: error
    }, dispatch);
  }

  export default connect(mapStateToProps, mapDispatchToProps)(App)
