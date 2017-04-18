import React, { Component } from 'react';
import Rnd from 'react-rnd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addAddon, getAddons, removeAddon, saveAddonLocation } from '../actions/addons'

const style = {
  textAlign: 'center',
  padding: '0px',
  border: 'solid 3px #fff',
  borderRadius: '5px',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};


class CurrentAddons extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeId: null
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

  renderAddons() {

    let deleteStyle = {
      zIndex: 10000000,
      color: 'black',
      right: '-20px',
      bottom: '-20px',
      position: 'absolute'
    }
    return this.props.usedAddons.map((image) => {
      let style = {
        textAlign: 'center',
        padding: '0px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };
      let spanStyle = {}
      let active = ''
      this.state.activeId === image.id ? active = 'active' : null

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
          bounds={'parent'}
          zIndex={6000}
          >
            <span onMouseDown={this.handleActive.bind(null, image.id)}  className="box" onMouseOut={this.handleMouseUp.bind(null, image.id)} style={{margin: '3px'}}>
              <div id={image.id} className={"img-mask " + active} ></div>
              <img className={'img'} src={image.url} />
            </span>
            {this.state.activeId === image.id ? (
            <span onClick={this.handleDelete.bind(null, image.id)} style={deleteStyle}>[x]</span>
          ) : null }
          </Rnd>
        )
      })
    }

    render() {
      return (
        <div style={{height: '1000px', zIndex: 1}} onDoubleClick={this.handleBlur}>
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
