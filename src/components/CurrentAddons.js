import React, { Component } from 'react';
import Rnd from 'react-rnd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addAddon, getAddons, removeAddon, saveAddonLocation } from '../actions/addons'

class CurrentAddons extends React.Component {

  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  handleDelete(id) {
    this.props.removeAddon(id)
  }

  handleMouseUp(id) {
    let coordinates = document.getElementById(id).getBoundingClientRect();
    this.props.saveAddonLocation(id, coordinates)
  }

  renderAddons() {
    const deleteStyle = {
      zIndex: 10000000
    }

    return this.props.usedAddons.map((image) => {
      return (
        <Rnd
          key={image.id}
          ref={c => { this.rnd = c; }}
          initial={{
            x: image.x,
            y: image.y,
            width: image.w,
            height: image.h,
          }}
          style={style}
          className='rnd'
          bounds={'parent'}
          zIndex={this.props.zIndex}
          >
            <span className="box" onMouseOut={this.handleMouseUp.bind(null, image.id)} style={{margin: '10px'}}>
              <div id={image.id} className="img-mask" ></div>
              <img className='img' src={image.url} />
            </span>
            <button onClick={this.handleDelete.bind(null, image.id)} style={deleteStyle}>[x]</button>
          </Rnd>
        )
      })
    }

  render() {
    return (
      <div style={{height: '1000px'}}>
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
    saveAddonLocation: saveAddonLocation
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentAddons)
