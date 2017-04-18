import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getDrawers } from '../actions/drawers'
import { getAddonsByCategory } from '../actions/addons'
import DrawerItem from './DrawerItem'

class Drawer extends React.Component {

  componentWillMount() {
    debugger
    this.props.getAddonsByCategory(this.props.drawer.name)
  }

  renderDrawerItems() {
    return this.props.drawerItems.map(item => {
      return <DrawerItem key={item.id} item={item}/>
    })
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
    drawerItems: state.AddonLibrary
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAddonsByCategory: getAddonsByCategory,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
