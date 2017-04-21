import React, { Component } from 'react';
import Rnd from 'react-rnd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addAddon, getAddons, removeAddon, saveAddonLocation } from '../actions/addons'

class Thumbnail extends Component {




  renderImg(addon) {
    return (
      <img
        id={addon.id + 't'}
        className={addon.category === 'photo' ? 'screenshot' : 'img-addon'}
        src={addon.url}>
      </img>
    )
  }

  renderText(addon) {
    let active = this.isActive(addon)
    return (
      <textarea
        id={addon.id + 't'}
        className={'text-addon ' + active}
        placeholder="Drag Me Anywhere!"
        >
        </textarea>
      )
    }




    renderAddons() {
      return this.props.addons.map((addon, index) => {

        return (
          <Rnd
            key={addon.id + 't'}
            id={addon.id + 't'}
            ref={c => { this.rnd = c; }}
            initial={{x: addon.x/8, y: addon.y/8, width: addon.w/8, height: addon.h/8}}
            className='rnd'
            bounds={'parent'}
            zIndex={addon.category === "photo" ? 2 : 100}
            >

              <span className="box">
                {addon.category === 'text' ?
                (this.renderText(addon)) : (this.renderImg(addon)) }
              </span>
            </Rnd>
          )
        })
      }

      render() {
        const divStyle = {
          position: 'absolute',
          top: 80,
          left: 0,
          width: '175px',
          height: '100px',
          zIndex: 10000,
          border: '1px solid black'
        }
        return (
          <div style={divStyle}>
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

    export default connect(mapStateToProps, mapDispatchToProps)(Thumbnail)
