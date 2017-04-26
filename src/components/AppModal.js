// std library imports
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// node_modules imports
import Modal from 'react-modal';
var Spinner = require('react-spinkit')

// app imports
import { closeAllModals } from '../actions/modals'
import Save from './Save'
import Photo from './Photo'
import Welcome from './Welcome'

class AppModal extends Component {

  renderSaveModal(customStyles) {
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

      renderWelcomeModal(customStyles) {
        return (
          <Modal
            isOpen={this.props.welcomeModalOpen}
            contentLabel="Welcome"
            style={customStyles}>
            <Welcome />
            {this.props.loading ? (
              <div className="ride-spinners">
                <Spinner spinnerName='double-bounce' />
              </div> )
              : (
                <button className="closeModal" onClick={this.props.closeAllModals}>start!</button>
              )
            }
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
              {this.renderWelcomeModal(customStyles)}
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
    welcomeModalOpen: state.Modals.welcome,
    saveModalOpen: state.Modals.save,
    webcamActive: state.Modals.webcam,
    loading: state.Loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    closeAllModals: closeAllModals,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppModal)
