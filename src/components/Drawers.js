import React from 'react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import getDrawers from '../actions/drawers'
import Drawer from './drawer'

export default class Drawers extends React.Component {
  componentWillMount() {

  }

  render() {
    return (
      <div className="drawers">
        {state.props.drawers.map((drawer) => {
          <Drawer drawer={drawer}/>
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
    getDrawers: getDrawers,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawers)
