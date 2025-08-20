import React from 'react';
import { connect } from 'react-redux';

import type { RootState } from '../reducers';
import type { AddonLibraryItem } from '../types/actions';
import DrawerItem from './DrawerItem';

interface DrawerModel {
  id: number;
  name: string;
  addons: (AddonLibraryItem & { id?: string })[];
}
interface StateProps {
  library: DrawerModel[];
}
interface OwnProps {
  drawer: DrawerModel;
  active: string;
}
type DrawerProps = StateProps & OwnProps;

class Drawer extends React.Component<DrawerProps> {
  render() {
    return (
      <div className={'drawer drawer-' + this.props.drawer.id + ' ' + this.props.active}>
        <DrawerItems library={this.props.library} drawer={this.props.drawer} />
      </div>
    );
  }
}

interface DrawerItemProps {
  library: DrawerProps['library'];
  drawer: DrawerProps['drawer'];
}

const DrawerItems = ({ library, drawer }: DrawerItemProps) => {
  if (library.length === 0) return <p className={'loading'}>Loading...</p>;

  const items = library[drawer.id - 1]?.addons || [];

  return (
    <>
      {items.map((item) => (
        <DrawerItem key={item.id} drawerId={drawer.id} item={item} type={drawer.name} />
      ))}
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  library: state.AddonLibrary as unknown as DrawerModel[],
});
export default connect(mapStateToProps)(Drawer);
