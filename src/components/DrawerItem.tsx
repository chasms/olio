import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, type Dispatch } from 'redux';

import { addAddon } from '../actions/addons';
import { finishedLoading } from '../actions/loading';
import type { AddonLibraryItem } from '../types/actions';
import type { RootState } from '../reducers';

interface StateProps {
  library: { addons: AddonLibraryItem[] }[];
}
interface DispatchProps {
  finishedLoading: () => void;
  addAddon: (addon: Partial<AddonLibraryItem>) => void;
}
interface OwnProps {
  drawerId: number;
  item: AddonLibraryItem & { id?: string };
  type: string;
}
type Props = StateProps & DispatchProps & OwnProps;

class DrawerItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleImg = this.handleImg.bind(this);
    this.handleText = this.handleText.bind(this);
  }
  handleImg() {
    this.props.addAddon(this.props.item);
  }
  handleText() {
    this.props.addAddon({
      ...this.props.item,
      category: 'text',
      fontFamily: this.extractFontName(this.props.item.url),
    });
  }
  renderImg() {
    const divClass = this.props.drawerId === 2 ? 'emoji' : 'drawer-item';
    return (
      <div className={divClass}>
        <img
          onClick={this.handleImg}
          data-id={this.props.item.id}
          src={this.props.item.url}
          alt=""
        />
      </div>
    );
  }
  extractFontName(url: string) {
    const raw = url.split('=').pop() || '';
    return raw.trim().split('+').join(' ');
  }
  renderText() {
    const fontFamily = this.extractFontName(this.props.item.url);
    return (
      <div className={'drawer-item text-drawer-item'}>
        <p className="text-template" onClick={this.handleText} style={{ fontFamily }}>
          {fontFamily}
        </p>
        <link href={this.props.item.url} rel="stylesheet" />
      </div>
    );
  }
  componentDidMount() {
    const finalDrawer = this.props.library[this.props.library.length - 1];
    const finalItem = finalDrawer?.addons[finalDrawer.addons.length - 1];
    if (finalItem && this.props.item.id === finalItem.id) this.props.finishedLoading();
  }
  render() {
    return this.props.type === 'text' ? this.renderText() : this.renderImg();
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  library: state.AddonLibrary as unknown as { addons: AddonLibraryItem[] }[],
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators({ finishedLoading, addAddon }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DrawerItem);
