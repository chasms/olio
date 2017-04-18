import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getDrawers } from '../actions/drawers'
import { getAddonsByCategory } from '../actions/addons'
import DrawerItem from './DrawerItem'

class Drawer extends React.Component {
  render() {
    let draweritems = getAddonsByCategory()
    return (
      <div className="drawer">
        <label>{this.props.drawer.name}</label>
        {this.props.draweritems.map((item) => {
          <DrawerItem key={item.id} item={item}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
