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

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      webcamActive: false,
      signupModalOpen: false,
      sidebarOpen: false,
      restoreId: ''
    };
    this.props.getCreations(this.props.token)
    this.props.getDrawers()
    this.props.getAddons()
    this.props.checkIfLoggedIn()
    this.handleRestoreCreation = this.handleRestoreCreation.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.toggleWebcam = this.toggleWebcam.bind(this)
    this.handleText = this.handleText.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleSidebar = this.handleSidebar.bind(this)
    this.toggleSignupModel = this.toggleSignupModel.bind(this)
    this.handleIdChange = this.handleIdChange.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)

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

  closeModal() {
    this.setState({
      signupModalOpen: false
    })
  }

  toggleWebcam(){
    this.setState({
      webcamActive: !this.state.webcamActive,
      signupModalOpen: false
    })
  }

  toggleSignupModel(){
    this.setState({
      signupModalOpen: !this.state.signupModalOpen
    })
  }

  handleSidebar() {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    })
    // this.props.restoreCreation(this.state.restoreId, this.props.token)
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

  handleRestoreCreation(id, token) {
    this.handleSidebar()
    this.props.restoreCreation(id, token)
  }

  renderCreationList() {
    return this.props.creations.map((creation) => {
      return <p onClick={this.handleRestoreCreation.bind(null, creation.id, this.props.token)}>Creation #{creation.id}</p>
    })
  }

  renderSaveButton() {
    return this.props.token ? <button className="btn" onClick={this.handleSave}>Save Creation</button> : null
  }

  renderRestore() {
    return this.props.token ? <button className="btn" onClick={this.handleSidebar}>Restore</button> : null
  }

  renderLogout() {
    return this.props.token ? <button className="btn" onClick={this.handleLogout}>Log Out</button> : null
  }

  renderSignup() {
    return !this.props.token ? <button className="btn" onClick={this.toggleSignupModel}>Sign Up</button> : null
  }

  handleKeyDown(e) {
    console.log(e)
    if (e.ctrlKey && e.which == 87) {
      this.toggleWebcam()
    } else if (e.ctrlKey && e.which == 82) {
      this.handleRestore()
    } else if (e.ctrlKey && e.which == 84) {
      this.handleText()
    } else if (e.ctrlKey & e.which == 83) {
      this.handleSave()
    }
  }

   componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }



  renderSignInModal() {

    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    }
    if (!this.props.token)
    return (
      <Modal
        isOpen={this.state.signupModalOpen}
        contentLabel="Sign Up"
        style={customStyles}
        >
          <Signup closeModal={this.closeModal} />
        </Modal>
      )
    }



    render() {
      const divStyle = {
        height: '10000px'
      }


      return (
        <div className="app" onKeyDown={this.handleKeyDown}>
          <div className="btn-bar">
            <Tooltip />
            {this.renderSaveButton()}
            <button className="btn" onClick={this.toggleWebcam}>WEBCAM {this.state.webcamActive ? 'OFF' : 'ON' }</button>
            <button className="btn" onClick={this.handleText}>Add Text</button>
            {this.renderSignup()}
            {this.renderRestore()}
            {this.renderLogout()}
          </div>
          {this.renderSignInModal()}
          <Drawers />
          <CurrentAddons />
          <Sidebar sidebar={this.renderCreationList()}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            pullRight
            overlayClassName=''
            >

          </Sidebar>
          {this.state.webcamActive ? <Photo handleToggle={this.toggleWebcam} /> : null}
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
