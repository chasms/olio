// std library imports
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// app imports
import { closeAllModals } from '../actions/modals'
import { signup } from '../actions/accounts'

class Signup extends React.Component {

  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
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
    this.props.signup(this.state)
    this.props.closeAllModals()
  }
  render() {

    return (
      <div className="signup">
        <form onSubmit={this.handleSubmit}>
          <input className="form-input form-item" placeholder="Create a Username" type='text' onChange={this.handleChange} name='username' />
          <input className="form-input form-item" placeholder="Enter Your Email Address" type='text' onChange={this.handleChange} name='email' />
          <input className="form-input form-item" placeholder="Create a Password" type='password' onChange={this.handleChange} name='password' />
          <input className="form-input form-item" placeholder="Confirm Your Password" type='password' onChange={this.handleChange} name='password_confirmation' />
          <input className="form-submit form-item" type='submit' value="Create Your Account" />
        </form>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    closeAllModals: closeAllModals,
    signup: signup
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Signup)
