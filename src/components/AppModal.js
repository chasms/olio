// std library imports
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// node_modules imports
import Modal from 'react-modal';

// app imports
import { logout } from '../actions/accounts'
import { saveCreation } from '../actions/creations'
import { finishedLoading } from '../actions/loading'
import Signup from './Signup'
import Login from './Login'
import Save from './Save'
import Photo from './Photo'

class AppModal extends Component {

  renderSaveModal(customStyles) {
    if (this.props.token)
    return (
      <Modal
        isOpen={this.props.saveModalOpen}
        contentLabel="Save"
        style={customStyles}
        >
          <Save closeModal={this.props.closeModal} />
          <button className="closeModal" onClick={this.props.closeModal}>close</button>
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
            <Signup closeModal={this.props.closeModal} />
            <button className="closeModal" onClick={this.props.closeModal}>close</button>
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
              <Login closeModal={this.props.closeModal} />
              <button className="closeModal" onClick={this.props.closeModal}>close</button>
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
                <Photo handleToggle={this.props.toggleWebcamModal}
                  closeModal={this.props.closeModal}
                />
                <p>~ hit the spacebar to take a picture! ~</p>
                <button className="closeModal" onClick={this.props.closeModal}>close</button>
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
            currentCreation: state.CurrentCreation,
            token: state.Accounts.token,
          }
        }


        const mapDispatchToProps = (dispatch) => {
          return bindActionCreators({
            finishedLoading: finishedLoading,
            logout: logout,
            saveCreation: saveCreation
          }, dispatch);
        }
        export default connect(mapStateToProps, mapDispatchToProps)(AppModal)
