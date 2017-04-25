// std library imports
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// node_modules imports
import Modal from 'react-modal';

// app imports
import { logout } from '../actions/accounts'
import { saveCreation } from '../actions/creations'
import Signup from './Signup'
import Login from './Login'
import Save from './Save'
import Photo from './Photo'
import Tooltip from './Tooltip'

class AppModal extends Component {


componentWillMount(){
  document.addEventListener("keydown", this.props.handleKeyDown.bind(this));
}

renderSaveModal(customStyles) {
  if (this.props.token)
  return (
    <Modal
      isOpen={this.state.saveModalOpen}
      contentLabel="Save"
      style={customStyles}
    >
      <Save closeModal={this.closeModal} />
      <button className="closeModal" onClick={this.closeModal}>close</button>
    </Modal>
    )
  }

renderSignupModal(customStyles) {
  if (!this.props.token)
  return (
    <Modal
      isOpen={this.state.signupModalOpen}
      contentLabel="Sign Up"
      style={customStyles}
    >
      <Signup closeModal={this.closeModal} />
      <button className="closeModal" onClick={this.closeModal}>close</button>
    </Modal>
    )
  }

  renderLoginModal(customStyles) {
    if (!this.props.token)
    return (
      <Modal
        isOpen={this.state.loginModalOpen}
        contentLabel="Sign Up"
        style={customStyles}
      >
        <Login closeModal={this.closeModal} />
        <button className="closeModal" onClick={this.closeModal}>close</button>
      </Modal>
    )
  }

  renderWebcamModal(customStyles) {
    return (
      <Modal
        isOpen={this.state.webcamActive}
        contentLabel="Sign Up"
        style={customStyles}
      >
        <Photo handleToggle={this.toggleWebcamModal} />
        <p>~ hit the spacebar to take a picture! ~</p>
        <button className="closeModal" onClick={this.closeModal}>close</button>
      </Modal>
    )
  }

  modalStyles() {
    return {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        backgroundColor       : 'whitesmoke',
        textAlign							: 'center'
      },
      overlay : {
        zIndex	 			  : '10000'
      }
    }
  }

  render(){
    return(
      <div>
        {this.renderWebcamButton()}
          <div className="modals">
            {this.props.renderWebcamModal()}
            {this.props.renderSaveModal()}
            {this.props.renderSignupModal()}
            {this.props.renderLoginModal()}
          </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    currentCreation: state.CurrentCreation,
    token: state.Accounts.token,
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout: logout,
    saveCreation: saveCreation
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AppModal)
