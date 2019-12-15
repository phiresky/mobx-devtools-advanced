import React from "react";
import PropTypes from "prop-types";
import {InjectStores} from "../../../utils/InjectStores";

@InjectStores({
  subscribe: {
    treeExplorerStore: ["searchText"],
  },
  injectProps: ({treeExplorerStore})=>({
    searchText: treeExplorerStore.searchText,
    changeSearch: e=>treeExplorerStore.changeSearch(e.target.value),
  }),
})
export default class SearchComponents extends React.PureComponent<Partial<{searchText, changeSearch}>> {
  static propTypes = {
    searchText: PropTypes.string.isRequired,
    changeSearch: PropTypes.func.isRequired,
  };

  render() {
  	return (
      <input
        type="search"
        value={this.props.searchText}
        onChange={this.props.changeSearch}
        placeholder="Search (string/regex)"
        style={{
          border: "1px solid rgba(0, 0, 0, 0.12)",
          padding: 3,
          borderRadius: 4,
          width: 133,
        }}
      />
  	);
  }
}