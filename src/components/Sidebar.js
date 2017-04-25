// std library imports
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class Sidebar extends React.Component {

  handleRestoreCreation(id, token) {
    this.handleSidebar()
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
        className={'creations-bar' + (this.state.sidebarOpen ? ' open-sidebar' : '')} >
        {this.props.token ? (
          <div className='sidebar-buttons'>
            <button className="btn" onClick={this.toggleSaveModal}>Save Creation</button>
            <button className="btn" onClick={this.handleLogout}>Log Out</button>
          </div> )
            : (
          <div className='sidebar-buttons'>
            <button className="btn" onClick={this.toggleSignupModal}>Sign Up</button>
            <button className="btn" onClick={this.toggleLoginModal}>Login</button>
          </div> )
        }
        {this.renderCreationList()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Accounts.token,
    creations: state.Creations
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    deleteCreation: deleteCreation,
    checkIfLoggedIn: checkIfLoggedIn,
    logout: logout,
    saveCreation: saveCreation,
    addAddon: addAddon,
    getAddons: getAddons,
    getDrawers: getDrawers,
    restoreCreation: restoreCreation,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
