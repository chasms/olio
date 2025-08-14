import React from 'react';
import { connect } from 'react-redux';

import type { AddonItem } from '../types/actions';

interface Props {
  addon?: AddonItem;
  className?: string;
  flashClass?: string;
  onClick: () => void;
}

class Delete extends React.Component<Props> {
  render() {
    const { className = '', flashClass = '', onClick } = this.props;
    return (
      <span className={`delete ${className}`} onClick={onClick}>
        <div className={`delete-button ${flashClass}`}>x</div>
      </span>
    );
  }
}

export default connect()(Delete);
