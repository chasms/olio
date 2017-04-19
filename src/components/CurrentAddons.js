import React, { Component } from 'react';
import Rnd from 'react-rnd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addAddon, getAddons, removeAddon, saveAddonLocation } from '../actions/addons'

class CurrentAddons extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeId: null,
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleActive = this.handleActive.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(id, font, value) {
    let coordinates = document.getElementById(id).getBoundingClientRect();
    this.props.saveTextValue(id, coordinates, value)
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

  // renderTextAreas() {
  //   return this.props.text.map( text => {
  //     <Rnd
  //       key={text.id}
  //       id={text.id}
  //       ref={c => { this.rnd = c; }}
  //       initial={{x: 0, y: 0, width: 200, height: 100}}
  //       className='rnd'
  //     >
  //       <span className="box"
  //         onMouseDown={this.handleActive.bind(null, text.id)}
  //         onMouseOut={this.handleMouseUp.bind(null, text.id)}>
  //         <textarea
  //           className={'text-addon'}
  //           onChange={this.handleChange.bind()}>
  //         </textarea>
  //       </span>
  //       {this.state.activeId === image.id ?
  //         (<span className="delete"
  //           onClick={this.handleDelete.bind(null, text.id)}>
  //           [x]
  //         </span>)
  //         : null }
  //   })
  // }

  renderAddons() {
    return this.props.usedAddons.map((addon, index) => {

      let active = ''
      this.state.activeId === addon.id ? active = 'active-addon' : null

      return (
        <Rnd
          key={addon.id}
          id={addon.id}
          ref={c => { this.rnd = c; }}
          initial={{x: addon.x, y: addon.y, width: addon.w, height: addon.h}}
          className='rnd'
          bounds={'parent'}
          >
            <span className="box"
              onMouseDown={this.handleActive.bind(null, addon.id)}
              onMouseOut={this.handleMouseUp.bind(null, addon.id)}>
              <div id={addon.id} className={"img-mask " + active} ></div>
              <img className={'img-addon'} src={addon.url} />
            </span>
            {this.state.activeId === addon.id ?
              (<span className="delete"
                onClick={this.handleDelete.bind(null, addon.id)}>
                [x]
              </span>)
              : null }
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
