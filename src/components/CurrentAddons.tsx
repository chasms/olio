import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, type Dispatch } from 'redux';
import { Rnd } from 'react-rnd';

import { removeAddon, saveAddonLocation } from '../actions/addons';
import Delete from './Delete';
import Image from './Image';
import Text from './Text';
import type { AddonItem, AddonLibraryItem } from '../types/actions';
import type { RootState } from '../reducers';

// Props derived from Redux state
interface StateProps {
  usedAddons: AddonItem[];
  allAddons: AddonLibraryItem[];
}

// Props with dispatch functions (only those actually used in this component)
interface DispatchProps {
  removeAddon: (id: string) => void;
  saveAddonLocation: (
    id: string,
    coordinates: { top: number; left: number; height: number; width: number },
    value?: string
  ) => void;
}

interface OwnProps {}

interface LocalState {
  activeId: string | null;
}

type Props = StateProps & DispatchProps & OwnProps;

class CurrentAddons extends Component<Props, LocalState> {
  // Reference to the last interacted Rnd instance (not otherwise used)
  private rndRef: unknown;

  state: LocalState = { activeId: null };

  constructor(props: Props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount(): void {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleDelete(id: string): void {
    if (!id) return;
    this.props.removeAddon(id);
  }

  handleMouseUp(id: string): void {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let value: string | undefined;
    if (el instanceof HTMLTextAreaElement) {
      value = el.value;
    }
    // fontFamily ignored because saveAddonLocation action does not accept it (kept behavior parity)
    this.props.saveAddonLocation(
      id,
      {
        top: rect.top,
        left: rect.left,
        height: rect.height,
        width: rect.width,
      },
      value
    );
  }

  handleActive(id: string): void {
    this.setState((prev) => ({ activeId: prev.activeId === id ? null : id }));
  }

  handleKeyDown(e: KeyboardEvent): void {
    // Ctrl + D to delete active addon (legacy behavior preserved)
    if (e.ctrlKey && (e.key === 'd' || e.key === 'D' || e.which === 68)) {
      if (this.state.activeId) this.handleDelete(this.state.activeId);
    }
  }

  isActive(addon: AddonItem): string {
    return this.state.activeId === addon.id ? 'active-addon' : '';
  }

  renderDelete(addon: AddonItem) {
    return this.state.activeId === addon.id ? (
      <Delete
        addon={addon}
        className="addon-delete"
        flashClass="addon-flash"
        onClick={this.handleDelete.bind(null, addon.id)}
      />
    ) : null;
  }

  renderMask(addon: AddonItem) {
    const active = this.isActive(addon);
    if (addon.category === 'text') return null;
    const cls = addon.category === 'photo' ? 'screenshot-mask' : 'img-mask';
    return <div id={addon.id} className={`${cls} non-selectable ${active}`}></div>;
  }

  renderAddons() {
    return this.props.usedAddons.map((addon) => (
      <Rnd
        key={addon.id}
        id={addon.id}
        ref={(c: any) => {
          this.rndRef = c as unknown; // retained for possible future use
        }}
        initial={{ x: addon.x, y: addon.y, width: addon.w, height: addon.h }}
        className="rnd"
        bounds={'.workspace'}
        zIndex={addon.category === 'photo' ? 2 : 100}
      >
        {this.renderDelete(addon)}
        <span
          className="box"
          onMouseDown={() => this.handleActive(addon.id)}
          onMouseUp={() => this.handleMouseUp(addon.id)}
        >
          {this.renderMask(addon)}
          {addon.category === 'text' ? (
            <Text addon={addon} active={this.isActive(addon)} />
          ) : (
            <Image addon={addon} />
          )}
        </span>
      </Rnd>
    ));
  }

  render() {
    return <div className="workspace">{this.renderAddons()}</div>;
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  usedAddons: state.Addon,
  allAddons: state.AddonLibrary,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      removeAddon,
      saveAddonLocation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CurrentAddons);
