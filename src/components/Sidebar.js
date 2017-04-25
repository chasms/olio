// std library imports
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// app imports
import { openLoginModal, openSignupModal } from '../actions/modals'
import { saveCreation, restoreCreation, deleteCreation } from '../actions/creations'
import { checkIfLoggedIn, logout } from '../actions/accounts'
import Delete from './Delete'

class Sidebar extends React.Component {

  constructor() {
    super()
    this.handleRestoreCreation = this.handleRestoreCreation.bind(this)

  }

  handleRestoreCreation(id, token) {
    this.props.handleSidebar()
    this.props.restoreCreation(id, token)
  }

  renderCreationList() {
    return this.props.creations.map((creation) => {
      return (
        <div
          className="creation non-selectable"
          key={creation.id} >
          <Delete
            onClick={this.props.deleteCreation.bind(null, creation.id, this.props.token)}
            className="creation-delete"
            flashClass="creation-flash" />
          <span
            className='creation-restore'
            onClick={this.handleRestoreCreation.bind(null, creation.id, this.props.token)}>
            restore
          </span>
          <h3> {creation.title ? creation.title : 'Creation #' + creation.id} </h3>
        </div>
      )
    })
  }

  render() {
    return (
      <div
        className={'creations-bar' + (this.props.sidebarOpen ? ' open-sidebar' : '')} >
        {this.props.token ? (
          <div className='sidebar-buttons'>
            <button className="btn" onClick={this.props.toggleSaveModal}>Save Creation</button>
            <button className="btn" onClick={this.props.handleLogout}>Log Out</button>
          </div> )
            : (
          <div className='sidebar-buttons'>
            <button className="btn" onClick={this.props.openSignupModal}>Sign Up</button>
            <button className="btn" onClick={this.props.openLoginModal}>Login</button>
          </div> )
        }
        {this.renderCreationList()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sidebarOpen: state.Modals.sidebar,
    token: state.Accounts.token,
    creations: state.Creations
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    openLoginModal: openLoginModal,
    openSignupModal: openSignupModal,
    deleteCreation: deleteCreation,
    checkIfLoggedIn: checkIfLoggedIn,
    logout: logout,
    saveCreation: saveCreation,
    restoreCreation: restoreCreation,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
