import React from 'react';
import { connect } from 'react-redux';

import type { RootState } from '../reducers';
import type { AddonLibraryItem } from '../types/actions';
import Drawer from './Drawer';

interface DrawerModel {
  id: number;
  name: string;
  addons: AddonLibraryItem[];
}
interface StateProps {
  drawers: DrawerModel[];
}
interface LocalState {
  activeId: number;
  isActive: boolean;
}

class Drawers extends React.Component<StateProps, LocalState> {
  state: LocalState = { activeId: 0, isActive: false };
  handleDrawer = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    this.setState((s) =>
      s.isActive
        ? s.activeId === id
          ? { ...s, isActive: false }
          : { ...s, activeId: id }
        : { activeId: id, isActive: true }
    );
  };
  renderDrawerHandles() {
    const width = `${100 / this.props.drawers.length}%`;
    return this.props.drawers.map((drawer) => (
      <div
        key={drawer.id}
        style={{ width }}
        className={`drawer-handles ${this.state.activeId === drawer.id && this.state.isActive ? 'active-drawer-handle' : ''}`}
        onClick={(e) => this.handleDrawer(drawer.id, e)}
      >
        {drawer.name}
      </div>
    ));
  }
  renderDrawers() {
    return this.props.drawers.map((drawer) => (
      <Drawer
        key={drawer.id}
        drawer={drawer}
        active={this.state.activeId === drawer.id ? 'active-drawer' : 'inactive-drawer'}
      />
    ));
  }
  render() {
    return (
      <div className="drawers">
        <div className={`drawer-wrapper ${this.state.isActive ? 'active-drawer-wrapper' : ''}`}>
          {this.renderDrawers()}
        </div>
        <div className="drawer-handles-wrapper">{this.renderDrawerHandles()}</div>
      </div>
    );
  }
}
export default connect((s: RootState) => ({ drawers: s.Drawers }))(Drawers);
