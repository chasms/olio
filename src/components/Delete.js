// std library imports
import React, { Component } from 'react';

export default class CurrentAddons extends Component {

  render() {
    return (
      <span className="delete"
        onClick={this.props.onClick}>
        <div className="delete-button flash-hover">x</div>
      </span>
    )
  }

}
