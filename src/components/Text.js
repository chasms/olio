// std library imports
import React from 'react'
import { connect } from 'react-redux'

class Text extends React.Component {

  render() {
    return (
      <textarea
        id={this.props.addon.id}
        className={'text-addon non-selectable ' + this.props.active}
        placeholder="Drag Me Anywhere!"
        defaultValue={this.props.addon.value}
        style={{fontFamily: this.props.addon.fontFamily}}
        >
        </textarea>
    )
  }
}

export default connect()(Text)
