// std library imports
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// app imports
import { signup } from '../actions/accounts'
import { switchForm } from '../actions/forms'
import { closeAllModals } from '../actions/modals'

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
    this.handleFormSwitch = this.handleFormSwitch.bind(this)
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

  handleFormSwitch(e) {
    e.preventDefault()
    this.props.switchForm()
  }

  render() {

    return (
      <div className="signup">
        <form onSubmit={this.handleSubmit}>
          <h3>Signup!</h3>
          <input className="form-input form-item" placeholder="Create a Username" type='text' onChange={this.handleChange} name='username' />
          <input className="form-input form-item" placeholder="Enter Your Email Address" type='text' onChange={this.handleChange} name='email' />
          <input className="form-input form-item" placeholder="Create a Password" type='password' onChange={this.handleChange} name='password' />
          <input className="form-input form-item" placeholder="Confirm Your Password" type='password' onChange={this.handleChange} name='password_confirmation' />
          <input className="form-submit form-item" type='submit' value="Create Your Account" />
        </form>
        <p>Already have an Olio account?</p>
        <a href='#' onClick={this.handleFormSwitch}>Login!</a>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    closeAllModals: closeAllModals,
    signup: signup,
    switchForm: switchForm
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Signup)
