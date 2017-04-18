import React from 'react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import getDrawers from '../actions/Drawers'
import DrawerItem from './DrawerItem'

export default class Drawer extends React.Component {
  render() {
    let draweritems =
    return (
      <div className="drawer">
        {state.props.draweritems.map((item) => {
          <DrawerItem item={item}/>
        })}
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    drawers: state.Drawers
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAddonsByCategory: getAddonsByCategory,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawers)
