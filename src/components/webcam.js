import React from 'react';
import Webcam from 'react-user-media';

export default class Webcam extends React.Component {
  render() {
    return <Webcam ref="webcam"/>;
  }
}