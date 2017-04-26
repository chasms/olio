// std library imports
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// app imports
import { saveCreation, updateCreation } from '../actions/creations'
import { closeAllModals } from '../actions/modals'
class Save extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: this.props.currentCreation ? this.props.currentCreation.title : '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSaveClick = this.handleSaveClick.bind(this)
    this.handleUpdateClick = this.handleUpdateClick.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSaveClick(e) {
    e.preventDefault()
    this.props.saveCreation(this.props.usedAddons, this.state.title, this.props.token)
    this.props.closeModal()
  }
  handleUpdateClick(e) {
    e.preventDefault()
    this.props.updateCreation(this.props.usedAddons, this.state.title, this.props.currentCreation.id, this.props.token)
    this.props.closeModal()
  }
  render() {

    return (
      <div className="save">
        <input className="form-input form-item" placeholder="Give your creation a title" type='text' onChange={this.handleChange} name='title' value={this.state.title} />
        {this.props.currentCreation ? <input className="form-submit form-item" type='submit' value="Update your Creation" onClick={this.handleUpdateClick} /> : null}
        <input className="form-submit form-item" type='submit' value="Save as a New Creation" onClick={this.handleSaveClick} />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    token: state.Accounts.token,
    usedAddons: state.Addon,
    currentCreation: state.CurrentCreation
  }
}



const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    closeModal: closeAllModals,
    saveCreation: saveCreation,
    updateCreation: updateCreation
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Save)
