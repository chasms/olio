import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../actions/accounts'

class Signup extends React.Component {

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
    this.props.closeModal()
  }
  render() {

    return (
      <div className="login">
        <form className onSubmit={this.handleSubmit}>
          <input className="form-input form-item" placeholder="Create a Username" type='text' onChange={this.handleChange} name='username' />
          <input className="form-input form-item" placeholder="Create a Password" type='password' onChange={this.handleChange} name='password' />
          <input className="form-submit form-item" type='submit' value="Create Your Account" />
        </form>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login: login
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Login)
