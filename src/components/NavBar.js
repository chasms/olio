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
import WebcamButton from './WebcamButton'
import Tooltip from './Tooltip'
import Signup from './Signup'
import Login from './Login'
import Save from './Save'

class NavBar extends Component {

	constructor(props){
		super(props)
		this.state = {
			webcamActive: false,
			signupModalOpen: false,
			loginModalOpen: false,
			saveModalOpen: false
		}

		this.toggleWebcamModal = this.toggleWebcamModal.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.toggleSignupModal = this.toggleSignupModal.bind(this)
		this.toggleLoginModal = this.toggleLoginModal.bind(this)
		this.toggleSaveModal = this.toggleSaveModal.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.handleKeyDown = this.handleKeyDown.bind(this)
	}

	renderSaveButton() {
		return this.props.token ? <button className="btn" onClick={this.toggleSaveModal}>Save Creation</button> : null
	}

	renderRestore() {
		return this.props.token ? <button className="btn" >Restore</button> : null
	}

	renderLogout() {
		return this.props.token ? <button className="btn" onClick={this.handleLogout}>Log Out</button> : null
	}

	renderSignup() {
		return !this.props.token ? <button className="btn" onClick={this.toggleSignupModal}>Sign Up</button> : null
	}

	renderLogin() {
		return !this.props.token ? <button className="btn" onClick={this.toggleLoginModal}>Login</button> : null
	}

	handleSave() {
		this.closeModal()
		this.props.saveCreation(this.props.usedAddons, this.props.token)
	}

	toggleSaveModal() {
		this.setState({
			saveModalOpen: !this.state.saveModalOpen
		})
	}

	closeModal() {
		this.setState({
			signupModalOpen: false,
			loginModalOpen: false,
			saveModalOpen: false,
			webcamActive: false
		})
	}

	toggleWebcamModal(){
		this.setState({
			webcamActive: !this.state.webcamActive
		})
	}

	toggleSignupModal(){
		if (this.state.loginModalOpen) {
			this.setState({
				loginModalOpen: false
			})
		}
		this.setState({
			signupModalOpen: !this.state.signupModalOpen
		})
	}

	toggleLoginModal(){
		if (this.state.signupModalOpen) {
			this.setState({
				signupModalOpen: false
			})
		}
		this.setState({
			loginModalOpen: !this.state.loginModalOpen
		})
	}

	handleLogout() {
		this.props.logout()
		this.props.deleteAllAddons()
	}

	handleKeyDown(e) {
		if (e.ctrlKey && e.which === 87) {
			this.toggleWebcamModal()
		} else if (e.ctrlKey & e.which === 83) {
			this.handleSave()
		}
	}

	componentWillMount(){
		document.addEventListener("keydown", this.handleKeyDown.bind(this));
	}

	renderSaveModal(customStyles) {
		if (this.props.token)
		return (
			<Modal
				isOpen={this.state.saveModalOpen}
				contentLabel="Save"
				style={customStyles}
			>
				<Save closeModal={this.closeModal} />
				<button className="closeModal" onClick={this.closeModal}>close</button>
			</Modal>
			)
		}

	renderSignupModal(customStyles) {
		if (!this.props.token)
		return (
			<Modal
				isOpen={this.state.signupModalOpen}
				contentLabel="Sign Up"
				style={customStyles}
			>
				<Signup closeModal={this.closeModal} />
				<button className="closeModal" onClick={this.closeModal}>close</button>
			</Modal>
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

		render(){
			let customStyles = this.modalStyles()
			return(
				<div className='nav'>
					<Notifications notifications={this.props.notifications} />
					<Tooltip />
					<WebcamButton
						toggleWebcamModal={this.toggleWebcamModal}
						webcamActive={this.state.webcamActive}/>
					{this.renderSaveButton()}
					{this.renderSignup()}
					{this.renderLogin()}
					{this.renderLogout()}
					{this.renderRestore()}
					<div
						className="sidebar-handle"

					>
					{this.renderWebcamModal(customStyles)}
					{this.renderSaveModal(customStyles)}
					{this.renderSignupModal(customStyles)}
					{this.renderLoginModal(customStyles)}
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
			restoreCreation: restoreCreation
		}, dispatch);
	}

	export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
