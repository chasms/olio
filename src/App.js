// std library imports
import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// node_modules imports
import Rnd from 'react-rnd';
import Modal from 'react-modal';
import Sidebar from 'react-sidebar'

// app imports
import { addAddon, getAddons, deleteAllAddons } from './actions/addons'
import { saveCreation, restoreCreation, getCreations } from './actions/creations'
import { getDrawers } from './actions/drawers'
import { checkIfLoggedIn, logout } from './actions/accounts'
import CurrentAddons from './components/CurrentAddons'
import Photo from './components/Photo'
import Drawers from './components/Drawers'
import Signup from './components/Signup'
import Tooltip from './components/Tooltip'
import NavBar from './components/NavBar'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
    this.props.getCreations(this.props.token)
    this.props.getDrawers()
    this.props.getAddons()
    this.props.checkIfLoggedIn()
    this.handleSidebar = this.handleSidebar.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleSidebar() {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    })
    // this.props.restoreCreation(this.state.restoreId, this.props.token)
  }
  renderCreationList() {
    return this.props.creations.map((creation) => {
      return <p onClick={this.handleRestoreCreation.bind(null, creation.id, this.props.token)}>Creation #{creation.id}</p>
    })
  }

  handleKeyDown(e) {
    console.log(e)
    if (e.ctrlKey && e.which == 87) {
      this.toggleWebcam()
    } else if (e.ctrlKey && e.which == 84) {
      this.handleText()
    } else if (e.ctrlKey & e.which == 83) {
      this.handleSave()
    }
  }

   componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

    render() {
      const divStyle = {
        height: '10000px'
      }

      return (
        <div className="app" onKeyDown={this.handleKeyDown}>
          <NavBar />
          <Drawers />
          <CurrentAddons />
          <Sidebar sidebar={this.renderCreationList()}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            pullRight
            overlayClassName=''
            >
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
