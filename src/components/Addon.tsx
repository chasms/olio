import React from 'react';
import { connect } from 'react-redux';

import type { AddonItem } from '../types/actions';

export interface AddonProps {
  addon: AddonItem;
}

class Addon extends React.Component<AddonProps> {
  render() {
    const { addon } = this.props;
    return (
      <img
        id={addon.id}
        className={
          addon.category === 'photo' ? 'non-selectable screenshot' : 'non-selectable img-addon'
        }
        src={addon.url}
        alt={`img${addon.id}`}
      />
    );
  }
}

export default connect()(Addon);
