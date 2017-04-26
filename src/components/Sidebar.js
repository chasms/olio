// std library imports
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// app imports
import { openLoginModal, openSignupModal, openSaveModal, toggleSidebar } from '../actions/modals'
import { saveCreation, restoreCreation, deleteCreation } from '../actions/creations'
import { checkIfLoggedIn, logout } from '../actions/accounts'
import Delete from './Delete'
import Signup from './Signup'
import Login from './Login'

class Sidebar extends React.Component {

  constructor() {
    super()
    this.handleRestoreCreation = this.handleRestoreCreation.bind(this)
  }

  handleRestoreCreation(id, token) {
    this.props.toggleSidebar()
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

  renderLoginSignup() {

  }

  render() {
    return (
      <div
        className={'sidebar' + (this.props.sidebarOpen ? ' open-sidebar' : '')} >
        <h1>Olio</h1>
        {this.props.token ? (
          <div className='sidebar-buttons'>
            <button className="btn" onClick={this.props.handleLogout}>Log Out</button>
          </div> )
            : (
          <div className='sidebar-buttons'>
            <Signup />
            <Login />
          </div> )
        }
        {this.renderCreationList()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loginForm: state.Accounts.loginForm,
    token: state.Accounts.token,
    sidebarOpen: state.Modals.sidebar,
    creations: state.Creations
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleSidebar: toggleSidebar,
    deleteCreation: deleteCreation,
    checkIfLoggedIn: checkIfLoggedIn,
    logout: logout,
    saveCreation: saveCreation,
    restoreCreation: restoreCreation,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
