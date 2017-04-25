// std library imports
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// app imports
import { closeAllModals } from '../actions/modals'
import { login } from '../actions/accounts'

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
  render() {

    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <input className="form-input form-item" placeholder="Username" type='text' onChange={this.handleChange} name='username' />
          <input className="form-input form-item" placeholder="Password" type='password' onChange={this.handleChange} name='password' />
          <input className="form-submit form-item" type='submit' value="Login to Your Account" />
        </form>
      </div>
    )
  }
}



const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    closeAllModals: closeAllModals,
    login: login
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Login)
