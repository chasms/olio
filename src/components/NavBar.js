import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Modal from 'react-modal';
import Webcam from 'react-webcam';

import { addAddon, deleteAllAddons } from '../actions/addons'
import { saveCreation, restoreCreation } from '../actions/creations'
import { logout } from '../actions/accounts'
import CurrentAddons from './CurrentAddons'
import Photo from './Photo'
import Tooltip from './Tooltip'
import Signup from './Signup'

class NavBar extends Component {
	constructor(props){
		super(props)
		this.state = {
			webcamActive: false,
      		signupModalOpen: false
		};
		debugger
		this.handleRestoreCreation = this.handleRestoreCreation.bind(this)
	    this.toggleWebcam = this.toggleWebcam.bind(this)
	    this.handleSave = this.handleSave.bind(this)
	    this.toggleSignupModal = this.toggleSignupModal.bind(this)
	    this.handleLogout = this.handleLogout.bind(this)
	    this.closeModal = this.closeModal.bind(this)
	    this.handleText = this.handleText.bind(this)
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
    return !this.props.token ? <button className="btn" onClick={this.toggleSignupModal}>Sign Up</button> : null
}
handleSave() {
    this.props.saveCreation(this.props.usedAddons, this.props.token)
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
toggleSignupModal(){
	debugger
    this.setState({
      signupModalOpen: !this.state.signupModalOpen
    })
  }
handleLogout() {
    this.props.logout()
    this.props.deleteAllAddons()
  }

handleText() {
    this.props.addAddon({
      initial_height: 100,
      initial_width: 200,
      url: "https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-ultralight-webfont.woff",
      category: 'text'
    })
  }

handleRestoreCreation(id, token) {
    this.handleSidebar()
    this.props.restoreCreation(id, token)
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
	
	render(){
		return(
			<div>
				<div className="btn-bar">
		            <Tooltip />
		            {this.renderSaveButton()}
		            <button className="btn" onClick={this.toggleWebcam}>WEBCAM {this.state.webcamActive ? 'OFF' : 'ON' }</button>
		            <button className="btn" onClick={this.handleText}>Add Text</button>
		            {this.renderSignup()}
		            {this.renderRestore()}
		            {this.renderLogout()}
		            {this.state.webcamActive ? <Photo handleToggle={this.toggleWebcam} /> : null}
	         	</div>
	          	{this.renderSignInModal()}
	         </div>
		)
	}
}
 const mapStateToProps = (state) => {
    return {
      token: state.Accounts.token
    }
  }


  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      logout: logout,
      saveCreation: saveCreation,
      addAddon: addAddon,
      restoreCreation: restoreCreation
    }, dispatch);
  }


  export default connect(mapStateToProps, mapDispatchToProps)(NavBar)