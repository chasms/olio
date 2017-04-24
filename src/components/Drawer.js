// std library imports
import React from 'react'
import { connect } from 'react-redux'

// app imports
import DrawerItem from './DrawerItem'

class Drawer extends React.Component {

  renderDrawerItems() {
    if (this.props.library.length === 0) {
      return <p className={"loading"}>Loading...</p>
    } else {
      return this.props.library[this.props.drawer.id - 1].addons.map(item => {
        return <DrawerItem key={item.id} item={item} type={this.props.drawer.name}/>
      })
    }
  }

  render() {
    return (
      <div
        className={"drawer drawer-" + this.props.drawer.id + ' ' + this.props.active}>
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
