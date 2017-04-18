import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getDrawers } from '../actions/drawers'
import Drawer from './Drawer'

class Drawers extends React.Component {

  constructor() {
    super()
    this.handleDrawer = this.handleDrawer.bind(this)
  }

  handleDrawer(event) {
    event.preventDefault()
    debugger
    
  }

  componentWillMount() {
    this.props.getDrawers()
  }

  render() {
    return (
      <div className="drawers">
        {this.props.drawers.map( drawer => {
          return<div className="drawer-wrapper">
              <a className="drawer-handle" id={'drawer-handle-' + drawer.id} href="#"
                onClick={this.handleDrawer}>
                  {drawer.name}
              </a>
              <Drawer key={drawer.id} id={drawer.name + '-drawer'} drawer={drawer}/>
          </div>
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
