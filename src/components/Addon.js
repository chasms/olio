// std library imports
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Image extends React.Component {

  render() {
    return (
      <img
        id={this.props.addon.id}
        className={this.props.addon.category === 'photo' ? 'non-selectable screenshot' : 'non-selectable img-addon'}
        src={this.props.addon.url}
        alt={'img' + this.props.addon.id}
      />
      )
    )
  }
}

export default connect()(Image)
