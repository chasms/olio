// std library imports
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, type Dispatch } from 'redux';

// app imports
import { signup } from '../actions/accounts';
import { switchForm } from '../actions/forms';
import { closeAllModals } from '../actions/modals';
import type { AuthDetails } from '../actions/accounts';
interface DispatchProps {
  closeAllModals: () => void;
  signup: (details: AuthDetails) => void;
  switchForm: () => void;
}
interface LocalState {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}
// Using DispatchProps directly as component props (no own props)
class Signup extends React.Component<DispatchProps, LocalState> {
  constructor(props: DispatchProps) {
    super(props);
    this.state = { username: '', email: '', password: '', password_confirmation: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormSwitch = this.handleFormSwitch.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value } as Pick<LocalState, keyof LocalState>);
  }

  handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    this.props.signup(this.state);
    this.props.closeAllModals();
  }

  handleFormSwitch(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    this.props.switchForm();
  }

  render() {
    return (
      <div className="signup">
        <form onSubmit={this.handleSubmit}>
          <h3>Signup!</h3>
          <input
            className="form-input form-item"
            placeholder="Create a Username"
            type="text"
            onChange={this.handleChange}
            name="username"
          />
          <input
            className="form-input form-item"
            placeholder="Enter Your Email Address"
            type="text"
            onChange={this.handleChange}
            name="email"
          />
          <input
            className="form-input form-item"
            placeholder="Create a Password"
            type="password"
            onChange={this.handleChange}
            name="password"
          />
          <input
            className="form-input form-item"
            placeholder="Confirm Your Password"
            type="password"
            onChange={this.handleChange}
            name="password_confirmation"
          />
          <input className="form-submit form-item btn" type="submit" value="Create Your Account" />
        </form>
        <p>Already have an Olio account?</p>
        <a href="#" onClick={this.handleFormSwitch}>
          Login!
        </a>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ closeAllModals, signup, switchForm }, dispatch);
export default connect(null, mapDispatchToProps)(Signup);
