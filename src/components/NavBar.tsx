// std library imports
import { Component } from 'react';
// node_modules imports
import Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// (Removed unused action imports after typing cleanup)
import { toggleSidebar } from '../actions/modals';
import Keyboard from './Keyboard';
import SaveButton from './SaveButton';
import WebcamButton from './WebcamButton';

import type { RootState } from '../reducers';
interface StateProps {
  sidebarOpen: boolean;
  notifications: unknown;
  token?: string | null;
}
interface DispatchProps {
  toggleSidebar: () => void;
}
type Props = StateProps & DispatchProps;

class NavBar extends Component<Props> {
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

interface AccountsSlice {
  token?: string | null;
}
const mapStateToProps = (state: RootState): StateProps => {
  const accounts = state.Accounts as unknown as AccountsSlice;
  return {
    sidebarOpen: state.Modals.sidebar,
    notifications: state.Notifications,
    token: accounts?.token,
  };
};
import type { Dispatch } from 'redux';
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators({ toggleSidebar }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
