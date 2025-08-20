// std library imports
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, type Dispatch } from 'redux';

// app imports
import { login } from '../actions/accounts';
import { switchForm } from '../actions/forms';
import { closeAllModals } from '../actions/modals';

interface DispatchProps {
  closeAllModals: () => void;
  login: (creds: { username: string; password: string }) => void;
  switchForm: () => void;
}
interface LocalState {
  username: string;
  password: string;
}
type Props = DispatchProps;

class Login extends React.Component<Props, LocalState> {
  constructor(props: Props) {
    super(props);
    this.state = { username: '', password: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormSwitch = this.handleFormSwitch.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [e.target.name]: e.target.value } as unknown as LocalState);
  }

  handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    this.props.login(this.state);
    this.props.closeAllModals();
  }

  handleFormSwitch(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    this.props.switchForm();
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <h3>Login!</h3>
          <input
            className="form-input form-item"
            placeholder="Username"
            type="text"
            onChange={this.handleChange}
            name="username"
          />
          <input
            className="form-input form-item"
            placeholder="Password"
            type="password"
            onChange={this.handleChange}
            name="password"
          />
          <input
            className="form-submit form-item btn"
            type="submit"
            value="Login to Your Account"
          />
        </form>
        <p>Don&apos;t have an Olio account?</p>
        <a href="#" onClick={this.handleFormSwitch}>
          Signup!
        </a>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ closeAllModals, login, switchForm }, dispatch);
export default connect(null, mapDispatchToProps)(Login);
