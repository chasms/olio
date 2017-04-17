import React, { Component } from 'react';
import Rnd from 'react-rnd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addAddon, getAddons } from './actions/addons'
import CurrentAddons from './components/CurrentAddons'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { zIndex: 99, images: [0, 1, 2, 3, 4]};
    setTimeout(() => this.setState({ zIndex: 1000 }), 5000);
    this.handleClick = this.handleClick.bind(this)
    this.handleSteven = this.handleSteven.bind(this)
    this.props.getAddons()
  }

  handleClick() {
    this.props.addAddon(this.props.allAddons[Math.floor(Math.random() * this.props.allAddons.length - 1)])
  }
  handleSteven() {
    this.props.addAddon(this.props.allAddons[12])
  }


    render() {
      const divStyle = {
        height: '10000px'
      }
      return (
        <div style={divStyle}>
          <button onClick={this.handleClick}>Add Mustache</button>
          <button onClick={this.handleSteven}>STEVEN ME</button>
          <CurrentAddons zIndex={this.state.zIndex} />
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
