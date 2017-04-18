import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getAddonsByCategory } from '../actions/addons'
import DrawerItem from './DrawerItem'

class Drawer extends React.Component {

  render() {
    let draweritems = getAddonsByCategory(this.props.drawer.name)
    return (
      <div className="drawer" id={this.props.id}>
        {/* {this.props.draweritems.map(item => {
          return <div key={item.id} item={item}/>
        })} */}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAddonsByCategory: getAddonsByCategory,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(Drawer)
