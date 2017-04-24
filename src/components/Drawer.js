// std library imports
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// app imports
import { finishedLoading } from '../actions/loading'
import DrawerItem from './DrawerItem'

class Drawer extends React.Component {

  renderDrawerItems() {
    if (this.props.library.length === 0) {
      return <p className={"loading"}>Loading...</p>
    } else {
      let drawerItems = this.props.library[this.props.drawer.id - 1].addons.map(item => {
        return <DrawerItem key={item.id} item={item} type={this.props.drawer.name}/>
      })
      let finalDrawer = this.props.library[this.props.library.length - 1]
      if (this.props.drawer.id === finalDrawer.id) {
        this.props.finishedLoading()
      }
      return drawerItems
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    finishedLoading: finishedLoading
  }, dispatch);
}

const mapStateToProps = (state) => {
  return {
    library: state.AddonLibrary
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
