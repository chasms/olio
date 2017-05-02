// std library imports
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// node_modules imports

// app imports
import { addAddon, getAddons, deleteAllAddons } from './actions/addons'
import { success, error } from './actions/notifications'
import { saveCreation, restoreCreation, getCreations, deleteCreation } from './actions/creations'
import { getDrawers } from './actions/drawers'
import { checkIfLoggedIn, logout, getAccountDetails } from './actions/accounts'
import { toggleWebcamModal, openSaveModal } from './actions/modals'
import CurrentAddons from './components/CurrentAddons'
import Drawers from './components/Drawers'
import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'
import Delete from './components/Delete'
import AppModal from './components/AppModal'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.props.getDrawers()
    this.props.getAddons()
    this.props.checkIfLoggedIn()
    if (this.props.token) {
      this.props.getAccountDetails(this.props.token)
      this.props.getCreations(this.props.token)
    }
    this.handleSave = this.handleSave.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }
  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  handleClear() {
    this.props.deleteAllAddons()
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
      this.props.openSaveModal()
    } else if (e.ctrlKey && e.shiftKey && e.which ===  68) {
      this.handleClear()
    }
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
          handleSidebar={this.handleSidebar}
          handleSave={this.handleSave}
          handleLogout={this.handleLogout}
          />
        <AppModal
          handleSave={this.handleSave}
          handleLogout={this.handleLogout}
          handleKeyDown={this.handleKeyDown} />
        <Drawers loading={this.toggleWelcomeModal}/>
        <CurrentAddons />
        <Sidebar
          handleLogout={this.handleLogout}
        />
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
      getAccountDetails: getAccountDetails,
      getCreations: getCreations,
      saveCreation: saveCreation,
      deleteCreation: deleteCreation,
      restoreCreation: restoreCreation,
      toggleWebcamModal: toggleWebcamModal,
      openSaveModal: openSaveModal,
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
