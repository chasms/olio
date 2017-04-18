import React, { Component } from 'react';
import Rnd from 'react-rnd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
};


class CurrentText extends Component {

  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleDelete(id) {
    this.props.removeText(id)
  }


  handleChange(id, font, value) {
  	debugger
  	let coordinates = document.getElementById(id).getBoundingClientRect();
  	this.props.saveTextValue(id, coordinates, value)
  }

  renderText() {
    const deleteStyle = {
      zIndex: 10000000
    }

    return this.props.usedText.map((text) => {
      return (
        <Rnd
          key={text.id}
          ref={c => { this.rnd = c; }}
          initial={{
            x: text.x,
            y: text.y,
            width: text.w,
            height: text.h,
          }}
          style={style}
          bounds={'parent'}
          zIndex={this.props.zIndex}
          >
            <span className="textbox" onChange={this.handleChange.bind(null, text.id)} onMouseOut={this.handleMouseUp.bind(null, text.id)} style={{margin: '10px'}}>
              <div id={text.id} className="outerText" ></div>
              	<input type="text"/>	
            </span>
            <button onClick={this.handleDelete.bind(null, text.id)} style={deleteStyle}>[x]</button>
          </Rnd>
        )
      })
    }

    render() {
      return (
        <div style={{height: '1000px'}}>
          {this.renderText()}
        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      usedText: state.Text,
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      addText: addText,
      removeText: removeText,
    }, dispatch);
  };



  export default connect(mapStateToProps, mapDispatchToProps)(CurrentText)