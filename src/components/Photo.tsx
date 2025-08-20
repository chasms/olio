// std library imports
import React from 'react';
import { connect } from 'react-redux';
// node_modules imports
import Webcam from 'react-webcam';
import { bindActionCreators } from 'redux';

import { addAddon } from '../actions/addons';
// app imports
import { closeAllModals } from '../actions/modals';

interface DispatchProps {
  addAddon: (addon: {
    url: string;
    initial_height: number;
    initial_width: number;
    category: string;
  }) => void;
  closeAllModals: () => void;
}
type Props = DispatchProps;
interface LocalState {
  screenshot: string | null;
}

class Photo extends React.Component<Props, LocalState> {
  private webcamRef = React.createRef<Webcam>();
  state: LocalState = { screenshot: null };

  constructor(props: Props) {
    super(props);
    this.handleScreenshot = this.handleScreenshot.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  handleScreenshot() {
    (document.getElementsByClassName('workspace')[0] as HTMLElement | undefined)?.focus();
    const shot = this.webcamRef.current?.getScreenshot();
    if (shot) {
      this.props.addAddon({
        url: shot,
        initial_height: 300,
        initial_width: 400,
        category: 'photo',
      });
      this.setState({ screenshot: shot });
    }
  }
  handleKeyDown(e: KeyboardEvent) {
    if (e.which === 32) {
      e.preventDefault();
      this.handleScreenshot();
      this.props.closeAllModals();
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  render() {
    return (
      <div className="photobox">
        <Webcam className="webcam" ref={this.webcamRef} width={640} height={480} audio={false} />
      </div>
    );
  }
}

import type { Dispatch } from 'redux';
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ closeAllModals, addAddon }, dispatch);
export default connect(null, mapDispatchToProps)(Photo);
