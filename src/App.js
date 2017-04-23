// std library imports
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// node_modules imports
import Sidebar from 'react-sidebar'

// app imports
import { addAddon, getAddons, deleteAllAddons } from './actions/addons'
import { saveCreation, restoreCreation, getCreations, deleteCreation } from './actions/creations'
import { getDrawers } from './actions/drawers'
import { checkIfLoggedIn, logout } from './actions/accounts'
import CurrentAddons from './components/CurrentAddons'
import Drawers from './components/Drawers'
import NavBar from './components/NavBar'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
    this.handleRestoreCreation = this.handleRestoreCreation.bind(this)
    this.props.getDrawers()
    this.props.getAddons()
    this.props.checkIfLoggedIn()
    if (this.props.token) { this.props.getCreations(this.props.token) }
    this.handleSidebar = this.handleSidebar.bind(this)
  }

  handleSidebar() {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    })
    // this.props.restoreCreation(this.state.restoreId, this.props.token)
  }
  renderCreationList() {
    const deleteStyle = {
      cursor: 'pointer'
    }
    return this.props.creations.map((creation) => {
      return (
        <p key={creation.id}>
          <span onClick={this.props.deleteCreation.bind(null, creation.id, this.props.token)} style={deleteStyle}>
            [x]
          </span>
          <span onClick={this.handleRestoreCreation.bind(null, creation.id, this.props.token)} >
            Creation #{creation.id}
          </span>
        </p>
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
        <Drawers />
        <CurrentAddons />
        <Sidebar sidebar={this.renderCreationList()}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          children=''
          pullRight
          overlayClassName=''
          >
            {}
          </Sidebar>
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
