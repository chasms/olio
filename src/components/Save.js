// std library imports
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// app imports
import { saveCreation } from '../actions/creations'

class Save extends React.Component {

  constructor() {
    super()
    this.state = {
      title: '',
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
    this.props.saveCreation(this.props.usedAddons, this.state.title, this.props.token)
    this.props.closeModal()
  }
  render() {

    return (
      <div className="save">
        <form onSubmit={this.handleSubmit}>
          <input className="form-input form-item" placeholder="Give your creation a title" type='text' onChange={this.handleChange} name='title' />
          <input className="form-submit form-item" type='submit' value="Save Creation" />
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    token: state.Accounts.token,
    usedAddons: state.Addon
  }
}



const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveCreation: saveCreation
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Save)
