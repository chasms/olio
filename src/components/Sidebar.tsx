import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, type Dispatch } from 'redux';

import { checkIfLoggedIn, logout } from '../actions/accounts';
import { deleteCreation, restoreCreation, saveCreation } from '../actions/creations';
import { toggleSidebar } from '../actions/modals';
import Delete from './Delete';
import Login from './Login';
import Signup from './Signup';
import type { RootState } from '../reducers';
import type { Creation } from '../types/actions';

interface StateProps {
  username?: string;
  loginForm?: boolean;
  token?: string | null;
  sidebarOpen: boolean;
  creations: Creation[];
}
interface DispatchProps {
  toggleSidebar: () => void;
  deleteCreation: (id: string | number, title: string | undefined, token?: string | null) => void;
  checkIfLoggedIn: () => void;
  logout: () => void;
  saveCreation: (addons: unknown[], title: string, token?: string | null) => void;
  restoreCreation: (id: string | number, token?: string | null) => void;
}
type Props = StateProps & DispatchProps;

class Sidebar extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleRestoreCreation = this.handleRestoreCreation.bind(this);
  }

  handleRestoreCreation(id: string | number, token?: string | null) {
    this.props.toggleSidebar();
    this.props.restoreCreation(id, token || undefined);
  }

  renderCreationList() {
    return this.props.creations.map((creation) => (
      <div className="creation non-selectable" key={creation.id}>
        <Delete
          onClick={this.props.deleteCreation.bind(
            null,
            creation.id,
            creation.title,
            this.props.token
          )}
          className="creation-delete"
          flashClass="creation-flash"
        />
        <span
          className="creation-restore"
          onClick={this.handleRestoreCreation.bind(null, creation.id, this.props.token)}
        >
          restore
        </span>
        <h3>{creation.title ? creation.title : 'Creation #' + creation.id}</h3>
      </div>
    ));
  }

  renderLoginSignup() {
    return (
      <div className="registration-forms">{this.props.loginForm ? <Login /> : <Signup />}</div>
    );
  }

  renderSignedIn() {
    return (
      <div className="signed-in">
        <div className="sidebar-buttons">
          <button className="btn logout-btn" onClick={this.props.logout}>
            Log Out
          </button>
        </div>
        <h3>Your Creations:</h3>
        {this.renderCreationList()}
      </div>
    );
  }

  render() {
    return (
      <div className={'sidebar' + (this.props.sidebarOpen ? ' open-sidebar' : '')}>
        <h1>Olio</h1>
        {this.props.token ? <h4>{this.props.username}</h4> : null}
        {this.props.token ? this.renderSignedIn() : this.renderLoginSignup()}
      </div>
    );
  }
}

// Define minimal slice type views to avoid `any` while full reducers remain loosely typed
interface AccountsSlice {
  username?: string;
  token?: string | null;
}
interface FormsSlice {
  loginForm?: boolean;
}
type CreationsSlice = Creation[];
const mapStateToProps = (state: RootState): StateProps => {
  const accounts = state.Accounts as unknown as AccountsSlice;
  const forms = state.Forms as unknown as FormsSlice;
  const creations = state.Creations as unknown as CreationsSlice;
  return {
    username: accounts?.username,
    loginForm: forms?.loginForm,
    token: accounts?.token,
    sidebarOpen: state.Modals.sidebar,
    creations,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      toggleSidebar,
      deleteCreation,
      checkIfLoggedIn,
      logout,
      saveCreation,
      restoreCreation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
