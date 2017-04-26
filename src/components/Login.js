// std library imports
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// app imports
import { login } from '../actions/accounts'
import { switchForm } from '../actions/forms'
import { closeAllModals } from '../actions/modals'

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFormSwitch = this.handleFormSwitch.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.login(this.state)
    this.props.closeAllModals()
  }

  handleFormSwitch(e) {
    e.preventDefault()
    this.props.switchForm()
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <h3>Login!</h3>
          <input
            className="form-input form-item"
            placeholder="Username"
            type='text'
            onChange={this.handleChange}
            name='username' />
          <input
            className="form-input form-item"
            placeholder="Password"
            type='password'
            onChange={this.handleChange}
            name='password' />
          <input
            className="form-submit form-item"
            type='submit'
            value="Login to Your Account" />
        </form>
        <p>Don't have an Olio account?</p>
        <a href='#' onClick={this.handleFormSwitch}>Signup!</a>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    closeAllModals: closeAllModals,
    login: login,
    switchForm: switchForm
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Login)
