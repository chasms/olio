// std library imports
import { Component } from 'react';
import { connect } from 'react-redux';
// node_modules imports
import { Rnd } from 'react-rnd';
import { bindActionCreators } from 'redux';

// app imports
import { addAddon, getAddons, removeAddon, saveAddonLocation } from '../actions/addons';
import type { AddonItem } from '../types/actions';
import type { RootState } from '../reducers';

interface StateProps {
  usedAddons: AddonItem[];
}
interface DispatchProps {
  addAddon: (addon: Partial<AddonItem>) => void;
  getAddons: () => void;
  removeAddon: (id: string) => void;
  saveAddonLocation: (
    id: string,
    coords: { top: number; left: number; height: number; width: number },
    value?: string
  ) => void;
}
type Props = StateProps & DispatchProps;
class Thumbnail extends Component<Props> {
  private rnd: unknown;
  renderImg(addon: AddonItem) {
    return (
      <img
        id={addon.id + 't'}
        className={addon.category === 'photo' ? 'screenshot' : 'img-addon'}
        src={addon.url}
      ></img>
    );
  }

  // NOTE: isActive not previously defined; placeholder status class logic removed
  renderText(addon: AddonItem) {
    const active = '';
    return (
      <textarea
        id={addon.id + 't'}
        className={'text-addon ' + active}
        placeholder="Drag Me Anywhere!"
      ></textarea>
    );
  }

  renderAddons() {
    return this.props.usedAddons.map((addon) => (
      <Rnd
        key={addon.id + 't'}
        id={addon.id + 't'}
        ref={(c: unknown) => {
          this.rnd = c;
        }}
        initial={{ x: addon.x / 8, y: addon.y / 8, width: addon.w / 8, height: addon.h / 8 }}
        className="rnd"
        bounds={'parent'}
        zIndex={addon.category === 'photo' ? 2 : 100}
      >
        <span className="box">
          {addon.category === 'text' ? this.renderText(addon) : this.renderImg(addon)}
        </span>
      </Rnd>
    ));
  }

  render() {
    const divStyle: React.CSSProperties = {
      position: 'absolute' as const,
      top: 80,
      left: 0,
      width: '175px',
      height: '100px',
      zIndex: 10000,
      border: '1px solid black',
    };
    return <div style={divStyle}>{this.renderAddons()}</div>;
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  usedAddons: state.Addon as unknown as AddonItem[],
});

import type { Dispatch } from 'redux';
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ addAddon, getAddons, removeAddon, saveAddonLocation }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Thumbnail);
