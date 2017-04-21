// std library imports
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// app imports
import { getDrawers } from '../actions/drawers'
import DrawerItem from './DrawerItem'

class Drawer extends React.Component {

  renderDrawerItems() {
    if (this.props.library.length === 0) {
      return <p className={"loading"}>Loading...</p>
    } else {
      return this.props.library[this.props.drawer.id - 1].addons.map(item => {
        return <DrawerItem key={item.id} item={item}/>
      })
    }
  }

  render() {
    return (
      <div className={"drawer " + "drawer-" + this.props.drawer.id + ' ' + this.props.active}>
        {this.renderDrawerItems()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    library: state.AddonLibrary
  }
}

export default connect(mapStateToProps)(Drawer)
