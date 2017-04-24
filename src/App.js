// std library imports
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// node_modules imports
import Sidebar from 'react-sidebar'
import Modal from 'react-modal'


// app imports
import { addAddon, getAddons, deleteAllAddons } from './actions/addons'
import { saveCreation, restoreCreation, getCreations, deleteCreation } from './actions/creations'
import { getDrawers } from './actions/drawers'
import { checkIfLoggedIn, logout } from './actions/accounts'
import CurrentAddons from './components/CurrentAddons'
import Drawers from './components/Drawers'
import NavBar from './components/NavBar'
import Delete from './components/Delete'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      welcomeModalOpen: true
    };
    this.handleRestoreCreation = this.handleRestoreCreation.bind(this)
    this.props.getDrawers()
    this.props.getAddons()
    this.props.checkIfLoggedIn()
    this.props.token ? this.props.getCreations(this.props.token) : null
    this.handleSidebar = this.handleSidebar.bind(this)
    this.toggleWelcomeModal = this.toggleWelcomeModal.bind(this)
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
          top                   : '75%',
          left                  : '75%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          backgroundColor       : 'whitesmoke'
        },
        overlay : {
          zIndex          : '10000'
        }
      }
      return (
        <Modal
          isOpen={this.props.loading}
          contentLabel="Welcome"
          style={customStyles}>
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
        <NavBar handleSidebar={this.handleSidebar}/>
        <Drawers loading={this.toggleWelcomeModal}/>
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
      restoreCreation: restoreCreation
    }, dispatch);
  }

  export default connect(mapStateToProps, mapDispatchToProps)(App)
