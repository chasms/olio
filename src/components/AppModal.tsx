import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators, type Dispatch } from 'redux';
import Spinner from 'react-spinkit';

import { closeAllModals } from '../actions/modals';
import Photo from './Photo';
import Save from './Save';
import Welcome from './Welcome';
import type { RootState } from '../reducers';

interface StateProps {
  welcomeModalOpen: boolean;
  saveModalOpen: boolean;
  webcamActive: boolean;
  loading: boolean;
}
interface DispatchProps {
  closeAllModals: () => void;
}
interface OwnProps {}

interface LocalState {}

interface ModalStyles {
  content: React.CSSProperties;
  overlay: React.CSSProperties;
}

type Props = StateProps & DispatchProps & OwnProps;

class AppModal extends Component<Props, LocalState> {
  modalStyles(): ModalStyles {
    return {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'whitesmoke',
        textAlign: 'center',
      },
      overlay: {
        zIndex: 10000 as unknown as string, // react-modal typings accept number|string; keeping parity
      } as React.CSSProperties,
    };
  }

  renderSaveModal(customStyles: ModalStyles) {
    return (
      <Modal isOpen={this.props.saveModalOpen} contentLabel="Save" style={customStyles}>
        <Save />
        <button className="closeModal" onClick={this.props.closeAllModals}>
          close
        </button>
      </Modal>
    );
  }

  renderWebcamModal(customStyles: ModalStyles) {
    return (
      <Modal isOpen={this.props.webcamActive} contentLabel="Webcam" style={customStyles}>
        <Photo />
        <p>~ hit the spacebar to take a picture! ~</p>
        <button className="closeModal" onClick={this.props.closeAllModals}>
          close
        </button>
      </Modal>
    );
  }

  renderWelcomeModal(customStyles: ModalStyles) {
    return (
      <Modal isOpen={this.props.welcomeModalOpen} contentLabel="Welcome" style={customStyles}>
        <Welcome />
        {this.props.loading ? (
          <div className="ride-spinners">
            <Spinner name="double-bounce" />
          </div>
        ) : (
          <button className="closeModal" onClick={this.props.closeAllModals}>
            start!
          </button>
        )}
      </Modal>
    );
  }

  render() {
    const customStyles = this.modalStyles();
    return (
      <div className="modals">
        {this.renderWelcomeModal(customStyles)}
        {this.renderWebcamModal(customStyles)}
        {this.renderSaveModal(customStyles)}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  welcomeModalOpen: state.Modals.welcome,
  saveModalOpen: state.Modals.save,
  webcamActive: state.Modals.webcam,
  loading: state.Loading as boolean,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      closeAllModals,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AppModal);
