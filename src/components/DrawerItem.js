// std library imports
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// app imports
import { addAddon } from '../actions/addons'

class DrawerItem extends React.Component {

  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.addAddon(this.props.item)
  }

  render() {
    return (
      <div className="drawer-item">
        <img onClick={this.handleClick}
          data-id={this.props.item.id}
          src={this.props.item.url}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addAddon: addAddon,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(DrawerItem)
