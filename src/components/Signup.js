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
  }
  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' onChange={this.handleChange} name='username' />
          <input type='text' onChange={this.handleChange} name='email' />
          <input type='password' onChange={this.handleChange} name='password' />
          <input type='password' onChange={this.handleChange} name='password_confirmation' />
          <input type='submit' />
          {localStorage.getItem('token')}
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
