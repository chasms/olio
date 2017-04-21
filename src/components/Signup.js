import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
    this.props.closeModal()
  }
  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>username</label>
          <input type='text' onChange={this.handleChange} name='username' />
          <label>email</label>
          <input type='text' onChange={this.handleChange} name='email' />
          <label>password</label>
          <input type='password' onChange={this.handleChange} name='password' />
          <label>password confirmation</label>
          <input type='password' onChange={this.handleChange} name='password_confirmation' />
          <input type='submit' />
        </form>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signup: signup
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Signup)
