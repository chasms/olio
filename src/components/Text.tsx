import React from 'react';
import { connect } from 'react-redux';

import type { AddonItem } from '../types/actions';

interface TextProps {
  addon: AddonItem;
  active?: string;
}
class Text extends React.Component<TextProps> {
  render() {
    const { addon, active = '' } = this.props;
    return (
      <textarea
        id={addon.id}
        className={`text-addon non-selectable ${active}`}
        placeholder="Drag Me Anywhere!"
        defaultValue={addon.value}
        style={{ fontFamily: addon.fontFamily }}
      />
    );
  }
}
export default connect()(Text);
