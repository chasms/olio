// std library imports
import React from 'react';
import { connect } from 'react-redux'

class Delete extends React.Component {

  render() {
    return (
      <span className={"delete"}
        onClick={this.props.onClick}>
        <div className={"delete-button"}>x</div>
      </span>
    )
  }

}

export default connect()(Delete)
