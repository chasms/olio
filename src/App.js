import React, { Component } from 'react';
import Rnd from 'react-rnd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addAddon, getAddons } from './actions/addons'
const style = {
  textAlign: 'center',
  padding: '40px',
  border: 'solid 3px #fff',
  borderRadius: '5px',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { zIndex: 99, images: [0, 1, 2, 3, 4]};
    setTimeout(() => this.setState({ zIndex: 1000 }), 5000);
    this.handleClick = this.handleClick.bind(this)
    this.props.getAddons()
  }

  handleClick() {
    this.props.addAddon(this.props.allAddons[Math.floor(Math.random() * this.props.allAddons.length)])
  }
  renderAddons() {
    return this.props.usedAddons.map((image, index) => {
      return (
        <Rnd
          ref={c => { this.rnd = c; }}
          initial={{
            x: window.innerWidth / 2 - 200,
            y: window.innerHeight / 2 - 80,
            width: image.w,
            height: image.h,
          }}
          style={style}


          bounds={'parent'}
          zIndex={this.state.zIndex}
          >
            <span className="box" id={'img-' + index}>
              <img className='img' src={image.url} />
            </span>
          </Rnd>
        )
      })
    }

    render() {
      const divStyle = {
        height: '1000px'
      }
      return (
        <div style={divStyle}>
          <button onClick={this.handleClick}>Add Mustache</button>
          {this.renderAddons()}
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      usedAddons: state.Addon,
      allAddons: state.AddonLibrary
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      addAddon: addAddon,
      getAddons: getAddons
    }, dispatch);
  };



  export default connect(mapStateToProps, mapDispatchToProps)(App)
