// std library imports
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// node_modules imports
import Modal from 'react-modal';

// app imports
import { logout } from '../actions/accounts'
import { saveCreation } from '../actions/creations'
import { success, show, error } from '../actions/notifications'
import { finishedLoading } from '../actions/loading'
import {

  openSaveModal,
  toggleWebcamModal,
  openSignupModal,
  openLoginModal,
  closeAllModals

} from '../actions/modals'
import Signup from './Signup'
import Login from './Login'
import Save from './Save'
import Photo from './Photo'
import App from '../App'

class AppModal extends Component {

  renderSaveModal(customStyles) {
    if (this.props.token)
    return (
      <Modal
        isOpen={this.props.saveModalOpen}
        contentLabel="Save"
        style={customStyles}
        >
          <Save />
          <button className="closeModal" onClick={this.props.closeAllModals}>close</button>
        </Modal>
      )
    }

    renderSignupModal(customStyles) {
      if (!this.props.token)
      return (
        <Modal
          isOpen={this.props.signupModalOpen}
          contentLabel="Sign Up"
          style={customStyles}
          >
            <Signup />
            <button className="closeModal" onClick={this.props.closeAllModals}>close</button>
          </Modal>
        )
      }

      renderLoginModal(customStyles) {
        if (!this.props.token)
        return (
          <Modal
            isOpen={this.props.loginModalOpen}
            contentLabel="Sign Up"
            style={customStyles}
            >
              <Login />
              <button className="closeModal" onClick={this.props.closeAllModals}>close</button>
            </Modal>
          )
        }

        renderWebcamModal(customStyles) {

          return (
            <Modal
              isOpen={this.props.webcamActive}
              contentLabel="Webcam"
              style={customStyles}
              >
                <Photo />
                <p>~ hit the spacebar to take a picture! ~</p>
                <button className="closeModal" onClick={this.props.closeAllModals}>close</button>
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
            let customStyles = this.modalStyles()
            return(
              <div>
                <div className="modals">
                  {this.renderWebcamModal(customStyles)}
                  {this.renderSaveModal(customStyles)}
                  {this.renderSignupModal(customStyles)}
                  {this.renderLoginModal(customStyles)}
                </div>
              </div>
            )
          }
        }
        const mapStateToProps = (state) => {
          return {
            saveModalOpen: state.Modals.save,
            webcamActive: state.Modals.webcam,
            loginModalOpen: state.Modals.login,
            signupModalOpen: state.Modals.signup,
            currentCreation: state.CurrentCreation,
            token: state.Accounts.token,
          }
        }


        const mapDispatchToProps = (dispatch) => {
          return bindActionCreators({
            openSaveModal: openSaveModal,
            openLoginModal: openLoginModal,
            openSignupModal: openSignupModal,
            openWebcamModal: toggleWebcamModal,
            closeAllModals: closeAllModals,
            finishedLoading: finishedLoading,
            logout: logout,
            saveCreation: saveCreation
          }, dispatch);
        }
        export default connect(mapStateToProps, mapDispatchToProps)(AppModal)
