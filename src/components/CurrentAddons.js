import React, { Component } from 'react';
import Rnd from 'react-rnd';
import Textarea from 'react-autosize-textarea';
import Draggable from 'react-draggable';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addAddon, getAddons, removeAddon, saveAddonLocation } from '../actions/addons'
import { addText, removeText } from '../actions/texts'

const style = {
  textAlign: 'center',
  padding: '0px',
  border: 'solid 3px #fff',
  borderRadius: '5px',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: 0

};

const textStyle = {
  outline: "none",
  background: 'green',
  border: "none",
  paddingLeft: 10,
}

class CurrentAddons extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeId: null,
      activeDrags: 0,
      deltaPosition: {
        x: 0, y: 0
      },
      controlledPosition: {
        x: -400, y: 200
      }
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleActive = this.handleActive.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleTextDelete = this.handleTextDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
  }


  handleTextDelete(id) {
    this.props.removeText(id)
  }

  handleChange(id, font, value) {
    let coordinates = document.getElementById(id).getBoundingClientRect();
    this.props.saveTextValue(id, coordinates, value)
  }

  handleDelete(id) {
    this.props.removeAddon(id)
  }

  handleMouseUp(id) {
    let coordinates = document.getElementById(id).getBoundingClientRect();
    this.props.saveAddonLocation(id, coordinates)
  }

  handleActive(id, event) {
    this.setState({
      activeId: id
    })
  }

  handleBlur(event) {

    this.setState({
      activeId: null
    })
    // event.stopPropagation()
  }

  handleDrag(e, ui) {
    const {x, y} = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  }

  onStart() {
    this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop() {
    this.setState({activeDrags: --this.state.activeDrags});
  }



  renderAddons() {

    return this.props.usedAddons.map((image, index) => {
      let active = ''
      this.state.activeId === image.id ? active = 'active-addon' : null

      return (
        <Rnd
          key={image.id}
          ref={c => { this.rnd = c; }}
          initial={{x: image.x, y: image.y, width: image.w, height: image.h}}
          className='rnd'
          bounds={'parent'}
          >
            <span className="box"
              onMouseDown={this.handleActive.bind(null, image.id)}
              onMouseOut={this.handleMouseUp.bind(null, image.id)}>
              <div id={image.id} className={"img-mask " + active} ></div>
              <img className={'img-addon'} src={image.url} />
            </span>
            {this.state.activeId === image.id ?
              (<span className="delete"
                onClick={this.handleDelete.bind(null, image.id)}>
                [x]
              </span>)
              : null }
          </Rnd>
        )
      })
    }
    renderText() {
      const dragHandlers = {onStart: this.onStart.bind(this), onStop: this.onStop.bind(this)};
      const {deltaPosition, controlledPosition} = this.state;
      const deleteStyle = {
        zIndex: 10000000
      }

      return this.props.usedText.map((text) => {
        return (
          <Draggable
            zIndex={1000}
            {...dragHandlers}>
                <div className="textbox">
                	<Textarea
                    type="text">
                  </Textarea>
                  <button onClick={this.handleTextDelete.bind(null, text.id)} style={deleteStyle}>[x]</button>
                </div>

          </Draggable>
          )
        })
      }

  render() {
    return (
      <div className="workspace" onDoubleClick={this.handleBlur}>
        {this.renderAddons()}
        {this.renderText()}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    usedAddons: state.Addon,
    allAddons: state.AddonLibrary,
    usedText: state.Text
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addAddon: addAddon,
    getAddons: getAddons,
    removeAddon: removeAddon,
    saveAddonLocation: saveAddonLocation,
    removeText: removeText
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentAddons)
