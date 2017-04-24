// std library imports
import React from 'react'
import { connect } from 'react-redux'

// app imports
import Drawer from './Drawer'

class Drawers extends React.Component {

  constructor() {
    super()
    this.state = {
      activeId: 0,
      isActive: false
    }
    this.handleDrawer = this.handleDrawer.bind(this)
  }

  handleDrawer(id, event) {
    event.preventDefault()
    if (!this.state.isActive) {
      this.setState({
        activeId: id,
        isActive: true
      })
    } else if (this.state.activeId === id) {
      this.setState({
        isActive: false
      })
    } else {
      this.setState({
        activeId: id
      })
    }
  }

  renderDrawerHandles() {
    let width = `${100 / this.props.drawers.length}%`
    return this.props.drawers.map( drawer => {
      return (
        <div
          key={drawer.id}
          style={{width: width}}
          className={"drawer-handles " + (this.state.activeId === drawer.id ? 'active-drawer-handle' : '')}
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
          key={drawer.id}
          drawer={drawer}
          active={this.state.activeId === drawer.id ? 'active-drawer' : 'inactive-drawer'}
        />
      )
    })
  }

  render() {
    return (
      <div className="drawers">
        <div className={"drawer-wrapper " + (this.state.isActive ? "active-drawer-wrapper" : '') }>
          {this.renderDrawers()}
        </div>
        <div className="drawer-handles-wrapper">
          {this.renderDrawerHandles()}
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

export default connect(mapStateToProps)(Drawers)
