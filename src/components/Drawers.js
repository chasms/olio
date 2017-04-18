import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getDrawers } from '../actions/drawers'
import Drawer from './Drawer'

class Drawers extends React.Component {
  componentWillMount() {

  }

  render() {
    return (
      <div className="drawers">
        {this.props.drawers.map((drawer) => {
          <Drawer key={drawer.id} id={drawer.name + 'drawer'} drawer={drawer}/>
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
