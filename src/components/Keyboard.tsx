// Converted to TypeScript (rename to .tsx separately)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { RootState } from '../reducers';
import { Tooltip } from 'react-tooltip';

interface StateProps { token?: string | null }
interface OwnProps {}
interface LocalState {}

type Props = StateProps & OwnProps;

class Keyboard extends Component<Props, LocalState> {
  renderKeyboard() {
    return (
      <svg
        data-tip
        className="nav-svg keyboard-img"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 502.512 241"
        role="img"
        aria-label="Keyboard shortcuts"
      >
        {/* ...existing path data... */}
      </svg>
    );
  }

  renderToolTip() {
    return (
      <Tooltip className="tooltip" place="bottom" variant="dark" float={true}>
        <p>Webcam: ctrl + w</p>
        <p>Delete: ctrl + d</p>
        <p>Delete All: ctrl + shift + d</p>
        {!this.props.token ? <p>SignUp or Login to save!</p> : <p>Save: ctrl + s</p>}
      </Tooltip>
    );
  }

  render() {
    return (
      <div className="nav-button">
        {this.renderKeyboard()}
        {this.renderToolTip()}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({ token: (state.Accounts as any).token });

export default connect(mapStateToProps)(Keyboard);
