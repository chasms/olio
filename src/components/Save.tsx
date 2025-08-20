// std library imports
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, type Dispatch } from 'redux';

// app imports
import { saveCreation, updateCreation } from '../actions/creations';
import { closeAllModals } from '../actions/modals';
import type { RootState } from '../reducers';
import type { AddonItem, Creation } from '../types/actions';

interface StateProps {
  token?: string | null;
  usedAddons: AddonItem[];
  currentCreation?: Creation | null;
}
interface DispatchProps {
  closeModal: () => void;
  saveCreation: (addons: AddonItem[], title: string, token?: string | null) => void;
  updateCreation: (
    addons: AddonItem[],
    title: string,
    id: string | number,
    token?: string | null
  ) => void;
}
type Props = StateProps & DispatchProps;
interface LocalState {
  title: string;
}

class Save extends React.Component<Props, LocalState> {
  constructor(props: Props) {
    super(props);
    this.state = { title: this.props.currentCreation?.title || '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ title: e.target.value });
  }

  handleSaveClick(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault();
    this.props.saveCreation(this.props.usedAddons, this.state.title, this.props.token);
    this.props.closeModal();
  }
  handleUpdateClick(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault();
    if (this.props.currentCreation)
      this.props.updateCreation(
        this.props.usedAddons,
        this.state.title,
        this.props.currentCreation.id,
        this.props.token
      );
    this.props.closeModal();
  }

  render() {
    return (
      <div className="save">
        <input
          className="form-input form-item"
          placeholder="Give your creation a title"
          type="text"
          onChange={this.handleChange}
          name="title"
          value={this.state.title}
        />
        {this.props.currentCreation ? (
          <input
            className="btn form-submit form-item"
            type="submit"
            value="Update your Creation"
            onClick={this.handleUpdateClick}
          />
        ) : null}
        <input
          className="btn form-submit form-item"
          type="submit"
          value="Save as a New Creation"
          onClick={this.handleSaveClick}
        />
      </div>
    );
  }
}

interface AccountsSlice {
  token?: string | null;
}
interface CurrentCreationSlice {
  id: string | number;
  title?: string;
}
const mapStateToProps = (state: RootState): StateProps => {
  const accounts = state.Accounts as unknown as AccountsSlice;
  const currentCreation = state.CurrentCreation as unknown as CurrentCreationSlice | null;
  return {
    token: accounts?.token,
    usedAddons: state.Addon as unknown as AddonItem[],
    currentCreation: currentCreation || null,
  };
};
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators({ closeModal: closeAllModals, saveCreation, updateCreation }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Save);
