// std library imports
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// app imports
import { addAddon } from '../actions/addons'
import { finishedLoading } from '../actions/loading'

class DrawerItem extends React.Component {

  constructor() {
    super()
    this.handleImg = this.handleImg.bind(this)
    this.handleText = this.handleText.bind(this)
  }


  handleImg() {
    this.props.addAddon(this.props.item)
  }

  handleText() {
    this.props.addAddon({...this.props.item, category: 'text', fontFamily: this.extractFontName(this.props.item.url)})
  }

  renderImg() {
    return (
      <div className={"drawer-item"}>
        <img onClick={this.handleImg}
          data-id={this.props.item.id}
          src={this.props.item.url}
          alt='' />
      </div>
    )
  }

  extractFontName(url) {
    let raw = url.split('=').pop()
    let fontFamily = raw.trim().split('+').join(' ')
    return fontFamily
  }

  renderText() {
    let fontFamily = this.extractFontName(this.props.item.url)
    return (
      <div className={'drawer-item text-drawer-item'}>
        <p
          className="text-template"
          onClick={this.handleText}
          style={{ fontFamily: fontFamily }} >
          {fontFamily}
        </p>
        <link href={this.props.item.url} rel="stylesheet"/>
      </div>
    )
  }

  componentWillMount() {

    let finalDrawer = this.props.library[this.props.library.length - 1]
    let finalItem = finalDrawer.addons[finalDrawer.addons.length - 1]
    if (this.props.item.id === finalItem.id) {
      this.props.finishedLoading()
    }
  }

  render() {
    return this.props.type === 'text' ? this.renderText() : this.renderImg()
  }
}

const mapStateToProps = (state) => {
  return {
    library: state.AddonLibrary
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    finishedLoading: finishedLoading,
    addAddon: addAddon
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerItem)
