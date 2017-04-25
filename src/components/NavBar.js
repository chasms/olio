// std library imports
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// node_modules imports
import Modal from 'react-modal';
import Notifications from 'react-notification-system-redux';

// app imports
import { addAddon, deleteAllAddons } from '../actions/addons'
import { saveCreation, restoreCreation } from '../actions/creations'
import { logout } from '../actions/accounts'
import { success, show, error } from '../actions/notifications'
import Photo from './Photo'
import Tooltip from './Tooltip'
import Signup from './Signup'
import Login from './Login'
import Save from './Save'
import AppModal from './AppModal'

class NavBar extends Component {

	renderSaveButton() {
		return this.props.token ? <button className="btn" onClick={this.props.toggleSaveModal}>Save Creation</button> : null
	}

	renderRestore() {
		return this.props.token ? <button className="btn" onClick={this.props.handleSidebar}>Restore</button> : null
	}

	renderLogout() {
		return this.props.token ? <button className="btn" onClick={this.props.handleLogout}>Log Out</button> : null
	}

	renderSignup() {
		return !this.props.token ? <button className="btn" onClick={this.props.toggleSignupModal}>Sign Up</button> : null
	}

	renderLogin() {
		return !this.props.token ? <button className="btn" onClick={this.props.toggleLoginModal}>Login</button> : null
	}
	renderWebcamButton() {
		return (
			<button
				className="btn"
				onClick={this.props.toggleWebcamModal}
				>

					WEBCAM {this.props.webcamActive ? 'OFF' : 'ON' }
				</button>
		)
	}

	renderLoginModal(customStyles) {
		if (!this.props.token)
		return (
			<Modal
				isOpen={this.state.loginModalOpen}
				contentLabel="Sign Up"
				style={customStyles}
				>
					<Login closeModal={this.closeModal} />
					<button className="closeModal" onClick={this.closeModal}>close</button>
				</Modal>
			)
		}

		renderWebcamModal(customStyles) {
			return (
				<Modal
					isOpen={this.state.webcamActive}
					contentLabel="Sign Up"
					style={customStyles}
					>
						<Photo handleToggle={this.toggleWebcamModal} />
						<p>~ hit the spacebar to take a picture! ~</p>
						<button className="closeModal" onClick={this.closeModal}>close</button>
					</Modal>
				)
			}

			modalStyles() {
				return {
					content : {
						top                   : '50%',
						left                  : '50%',
						right                 : 'auto',
						bottom                : 'auto',
						marginRight           : '-50%',
						transform             : 'translate(-50%, -50%)',
						backgroundColor       : 'whitesmoke',
						textAlign							: 'center'
					},
					overlay : {
						zIndex	 			  : '10000'
					}
				}
			}

			renderWebcamButton() {
				return (
					<button
						className="btn"
						onClick={this.toggleWebcamModal}
						>
							WEBCAM {this.props.webcamActive ? 'OFF' : 'ON' }
						</button>
					)
				}

				render(){
					return(
						<div className="btn-bar">
							<Notifications notifications={this.props.notifications} />
							<Tooltip />
							{this.renderWebcamButton()}
							{this.renderSaveButton()}
							{this.renderSignup()}
							{this.renderLogin()}
							{this.renderLogout()}
							{this.renderRestore()}
						</div>
					)
				}
			}

			const mapStateToProps = (state) => {
				return {
					currentCreation: state.CurrentCreation,
					notifications: state.Notifications,
					token: state.Accounts.token,
					usedAddons: state.Addon
				}
			}

			const mapDispatchToProps = (dispatch) => {
				return bindActionCreators({
					success: success,
					error: error,
					deleteAllAddons: deleteAllAddons,
					logout: logout,
					saveCreation: saveCreation,
					addAddon: addAddon,
					restoreCreation: restoreCreation,
					saveCreation: saveCreation,
				}, dispatch);
			}

			export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
