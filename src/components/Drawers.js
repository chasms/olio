import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getDrawers } from '../actions/drawers'
import Drawer from './Drawer'

class Drawers extends React.Component {

  constructor() {
    super()
    this.state = {
      activeId: 1
    }
    this.handleDrawer = this.handleDrawer.bind(this)
  }

  handleDrawer(id, event) {
    event.preventDefault()
    this.setState({
      activeId: id
    })
  }

  componentWillMount() {
    this.props.getDrawers()
  }

  renderDrawerHandles() {
    return this.props.drawers.map( drawer => {
      return (
        <div
          key={drawer.id}
          className={"drawer-handle " + "drawer-" + drawer.id}
          onClick={this.handleDrawer.bind(null, drawer.id)}>
            {drawer.name}
        </div>
      )
    })
  }

  renderDrawers() {
    return this.props.drawers.map( drawer => {
      return (
        <Drawer
          active={this.state.activeId === drawer.id ? 'active-drawer' : 'inactive-drawer'}
          key={drawer.id}
          drawer={drawer}
        />
      )
    })
  }

  render() {
    return (
      <div className="drawers">
        <div className="drawer-handle-wrapper">
          {this.renderDrawerHandles()}
        </div>
        <div className="drawer-wrapper">
          {this.renderDrawers()}
        </div>
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
