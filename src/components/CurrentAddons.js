// std library imports
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// node_modules imports
import Rnd from 'react-rnd';

// app imports
import { addAddon, getAddons, removeAddon, saveAddonLocation } from '../actions/addons'
import Delete from './Delete'
import Image from './Image'
import Text from './Text'

class CurrentAddons extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeId: null,
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleActive = this.handleActive.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)

  }

  handleDelete(id) {
    this.props.removeAddon(id)
  }

  handleMouseUp(id) {
    let coordinates = document.getElementById(id).getBoundingClientRect();
    let value = document.getElementById(id).value
    let fontFamily = document.getElementById(id).fontFamily
    this.props.saveAddonLocation(id, coordinates, value, fontFamily)
  }

  handleActive(id, event) {
    if (this.state.activeId === id) {
      this.setState({
        activeId: null
      })
    } else {
      this.setState({
        activeId: id
      })
    }
  }

  handleKeyDown(e){
    if (e.ctrlKey && e.which === 68) {
      this.handleDelete(this.state.activeId)
    }
  }

  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown.bind(this))
  }

  renderMask(addon) {
    let active = this.isActive(addon)
    if (addon.category !== 'text') {
      return (
        <div
          id={addon.id}
          className={addon.category === 'photo' ? "screenshot-mask non-selectable " + active : "img-mask non-selectable " + active}>
        </div>
      )
    } else {
      return
    }
  }

  isActive(addon) {
    return this.state.activeId === addon.id ? 'active-addon' : ''
  }

  renderDelete(addon) {
    return this.state.activeId === addon.id ?(
      <Delete
        addon={addon}
        className='addon-delete'
        flashClass='addon-flash'
        onClick={this.handleDelete.bind(null, addon.id)}
      />)
      : null
  }

  renderAddons() {
    return this.props.usedAddons.map((addon, index) => {
      return (
        <Rnd
          key={addon.id}
          id={addon.id}
          ref={c => { this.rnd = c; }}
          initial={{x: addon.x, y: addon.y, width: addon.w, height: addon.h}}
          className='rnd'
          bounds={'.workspace'}
          zIndex={addon.category === "photo" ? 2 : 100}
        >
            {this.renderDelete(addon)}
            <span className="box"
              onMouseDown={this.handleActive.bind(null, addon.id)}
              onMouseUp={this.handleMouseUp.bind(null, addon.id)}
            >
                {this.renderMask(addon)}
                {addon.category === 'text' ?
                (<Text addon={addon} active={this.isActive(addon)}/>)
                : (<Image addon={addon}/>) }
            </span>
        </Rnd>
      )
    })
  }

  render() {
    return (
      <div className="workspace" onKeyDown={this.handleKeyDown}>
        {this.renderAddons()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    usedAddons: state.Addon,
    allAddons: state.AddonLibrary
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addAddon: addAddon,
    getAddons: getAddons,
    removeAddon: removeAddon,
    saveAddonLocation: saveAddonLocation,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentAddons)
