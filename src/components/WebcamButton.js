import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { openWebcamModal } from '../actions/modals'

class WebcamButton extends React.Component{

  render() {
    return (
      <div className="nav-button">
        <svg
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 347.846 347.846"
          className={'nav-svg webcam-button' + (this.props.webcamActive ? ' webcam-active' : '') }
          onClick={this.props.openWebcamModal}>
        <g>
          <g>
            <g>
              <path d="M259.095,270.913c38.49-26.962,63.711-71.59,63.711-122.042C322.806,66.786,256.032,0,173.923,0
                C91.828,0,25.04,66.786,25.04,148.871c0,50.95,25.716,95.963,64.821,122.81C70,279.788,59.189,290.62,59.189,302.81
                c0,29.244,59.898,45.036,116.266,45.036c56.349,0,116.234-15.792,116.234-45.036
                C291.688,290.183,280.213,279.091,259.095,270.913z M173.565,46.222c6.947,0,12.56,5.626,12.56,12.568
                c0,6.936-5.611,12.568-12.56,12.568c-6.924,0-12.556-5.633-12.556-12.568C161.009,51.849,166.642,46.222,173.565,46.222z
                M173.923,85.022c35.224,0,63.866,28.648,63.866,63.854s-28.644,63.873-63.866,63.873c-35.215,0-63.864-28.655-63.864-63.873
                C110.059,113.665,138.708,85.022,173.923,85.022z M175.454,335.284c-64.236,0-103.683-18.922-103.683-32.475
                c0-7.83,12.193-16.44,31.868-22.733c20.951,11.289,44.883,17.69,70.289,17.69c25.862,0,50.176-6.643,71.379-18.279
                c20.604,6.281,33.831,15.287,33.831,23.322C279.127,316.362,239.688,335.284,175.454,335.284z"/>
              </g>
              <g>
                <path d="M173.923,191.379c23.431,0,42.502-19.068,42.502-42.496c0-23.424-19.071-42.493-42.502-42.493
                  c-23.428,0-42.484,19.068-42.484,42.493C131.438,172.311,150.495,191.379,173.923,191.379z"/>
                </g>
              </g>
            </g>
          </svg>
        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      webcamActive: state.Modals.webcam
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      openWebcamModal: openWebcamModal
    }, dispatch);
  }

  export default connect(mapStateToProps, mapDispatchToProps)(WebcamButton)
