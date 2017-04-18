import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getAddonsByCategory } from '../actions/addons'

class DrawerItem extends React.Component {

  render() {
    return (
      <div className="stuff">
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAddonsByCategory: getAddonsByCategory,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(DrawerItem)
