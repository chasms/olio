import React, { Component } from 'react';
import Rnd from 'react-rnd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addAddon, getAddons, removeAddon, saveAddonLocation } from '../actions/addons'

class CurrentAddons extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeId: null,
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleActive = this.handleActive.bind(this)
    this.handleBlur = this.handleBlur.bind(this)

  }

  handleDelete(id) {
    this.props.removeAddon(id)
  }

  handleMouseUp(id) {
    let coordinates = document.getElementById(id).getBoundingClientRect();
    this.props.saveAddonLocation(id, coordinates)
  }

  handleActive(id, event) {
    this.setState({
      activeId: id
    })
  }

  handleBlur(event) {
    this.setState({
      activeId: null
    })
    // event.stopPropagation()
  }



  renderImg(addon) {
    return (
      <img
        id={addon.id}
        className={addon.category === 'photo' ? 'screenshot' : 'img-addon'}
        src={addon.url}>
      </img>
    )
  }

  renderText(addon) {
    let active = this.isActive(addon)
    return (
      <textarea
        id={addon.id}
        className={'text-addon ' + active}
        placeholder="Drag Me Anywhere!"
        >
        </textarea>
      )
    }

    renderMask(addon) {
      let active = this.isActive(addon)
      if (addon.category !== 'text') {
        return (
          <div
            id={addon.id}
            className={"img-mask " + active}>
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
        <span className="delete"
          onClick={this.handleDelete.bind(null, addon.id)}>
          <div className="delete-button flash-hover">x</div>
        </span>)
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
              bounds={'parent'}
              >
                {this.renderDelete(addon)}
                <span className="box"
                  onMouseDown={this.handleActive.bind(null, addon.id)}
                  onMouseOut={this.handleMouseUp.bind(null, addon.id)}
                  >
                    {this.renderMask(addon)}
                    {addon.category === 'text' ?
                    (this.renderText(addon)) : (this.renderImg(addon)) }
                  </span>
                </Rnd>
              )
            })
          }

          render() {
            return (
              <div className="workspace" onDoubleClick={this.handleBlur}>
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
