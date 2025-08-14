// std library imports
import React, { Component } from 'react';
// node_modules imports
import Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logout } from '../actions/accounts';
// app imports
import { addAddon, deleteAllAddons } from '../actions/addons';
import { restoreCreation, saveCreation } from '../actions/creations';
import { toggleSidebar } from '../actions/modals';
import Keyboard from './Keyboard';
import SaveButton from './SaveButton';
import WebcamButton from './WebcamButton';

class NavBar extends Component {
  render() {
    return (
      <div className="nav">
        <Notifications notifications={this.props.notifications} />
        <WebcamButton />
        <Keyboard />
        {this.props.token ? <SaveButton /> : null}
        <div
          className={
            'nav-button sidebar-handle' + (this.props.sidebarOpen ? ' open-sidebar-handle' : '')
          }
          onClick={this.props.toggleSidebar}
        ></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sidebarOpen: state.Modals.sidebar,
    currentCreation: state.CurrentCreation,
    notifications: state.Notifications,
    token: state.Accounts.token,
    usedAddons: state.Addon,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      toggleSidebar: toggleSidebar,
      deleteAllAddons: deleteAllAddons,
      logout: logout,
      addAddon: addAddon,
      restoreCreation: restoreCreation,
      saveCreation: saveCreation,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
