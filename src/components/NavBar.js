// std library imports
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// node_modules imports
import Notifications from 'react-notification-system-redux';

// app imports
import { addAddon, deleteAllAddons } from '../actions/addons'
import { saveCreation, restoreCreation } from '../actions/creations'
import { logout } from '../actions/accounts'
import { toggleSidebar } from '../actions/modals'
import WebcamButton from './WebcamButton'
import Tooltip from './Tooltip'

class NavBar extends Component {

	render(){
		return(
			<div className="nav">
				<Notifications notifications={this.props.notifications} />
				<WebcamButton />
				<Tooltip />
				<div
					className={'nav-button sidebar-handle' + (this.props.sidebarOpen ? ' open-sidebar-handle' : '')}
					onClick={this.props.toggleSidebar} >
				</div>
			</div>
		)
	}
}

			const mapStateToProps = (state) => {
				return {
					sidebarOpen: state.Modals.sidebar,
					currentCreation: state.CurrentCreation,
					notifications: state.Notifications,
					token: state.Accounts.token,
					usedAddons: state.Addon
				}
			}

			const mapDispatchToProps = (dispatch) => {
				return bindActionCreators({
					toggleSidebar: toggleSidebar,
					deleteAllAddons: deleteAllAddons,
					logout: logout,
					addAddon: addAddon,
					restoreCreation: restoreCreation,
					saveCreation: saveCreation,
				}, dispatch);
			}

			export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
