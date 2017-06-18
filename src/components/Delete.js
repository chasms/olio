// std library imports
import React from 'react';
import { connect } from 'react-redux'

class Delete extends React.Component {

  render() {
    return (
      <span className={"delete " + this.props.className}
        onClick={this.props.onClick}>
        <div className={"delete-button " + this.props.flashClass}>x</div>
      </span>
    )
  }

}

export default connect()(Delete)
