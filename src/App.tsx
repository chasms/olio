import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, type Dispatch } from 'redux';

import { checkIfLoggedIn, getAccountDetails } from './actions/accounts';
import { deleteAllAddons, getAddons } from './actions/addons';
import { getCreations, restoreCreation } from './actions/creations';
import { getDrawers } from './actions/drawers';
import { openSaveModal, toggleWebcamModal } from './actions/modals';
import AppModal from './components/AppModal';
import CurrentAddons from './components/CurrentAddons';
import Drawers from './components/Drawers';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import type { RootState } from './reducers';

interface StateProps {
  loading: RootState['Loading'];
  token: RootState['Accounts']['token'];
  usedAddons: RootState['Addon'];
  addonLibrary: RootState['AddonLibrary'];
  creations: RootState['Creations'];
}

interface DispatchProps {
  getAccountDetails: typeof getAccountDetails;
  getCreations: typeof getCreations;
  restoreCreation: typeof restoreCreation;
  toggleWebcamModal: typeof toggleWebcamModal;
  openSaveModal: typeof openSaveModal;
  getAddons: typeof getAddons;
  deleteAllAddons: typeof deleteAllAddons;
  getDrawers: typeof getDrawers;
  checkIfLoggedIn: typeof checkIfLoggedIn;
}

type AppProps = StateProps & DispatchProps;

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);

    this.props.getDrawers();
    this.props.getAddons();
    this.props.checkIfLoggedIn();

    if (this.props.token) {
      this.props.getAccountDetails(this.props.token);
      this.props.getCreations(this.props.token);
    }

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleClear() {
    this.props.deleteAllAddons();
  }

  handleKeyDown(e) {
    if (e.ctrlKey && e.which === 87) {
      this.props.toggleWebcamModal();
    } else if (e.ctrlKey && e.which === 83) {
      this.props.openSaveModal();
    } else if (e.ctrlKey && e.shiftKey && e.which === 68) {
      this.handleClear();
    }
  }

  render() {
    return (
      <div className="app" onKeyDown={this.handleKeyDown}>
        <NavBar />
        <AppModal />
        <Drawers />
        <CurrentAddons />
        <Sidebar />
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
    creations: state.Creations,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getAccountDetails: getAccountDetails,
      getCreations: getCreations,
      restoreCreation: restoreCreation,
      toggleWebcamModal: toggleWebcamModal,
      openSaveModal: openSaveModal,
      getAddons: getAddons,
      deleteAllAddons: deleteAllAddons,
      getDrawers: getDrawers,
      checkIfLoggedIn: checkIfLoggedIn,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
