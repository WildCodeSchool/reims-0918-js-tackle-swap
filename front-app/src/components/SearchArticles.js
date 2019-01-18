import React, { Component } from "react";
import { InputBase, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export class SearchArticles extends Component {
  render() {
    const { handleChangeSearch, search } = this.props;
    return (
      <form>
        <InputBase
          margin="dense"
          autoFocus={true}
          placeholder=" Votre recherche ..."
          style={{
            backgroundColor: "#ffffff",
            border: "8px solid #e6f7ff",
            width: "96%",
            color: "#009682"
          }}
          onChange={e => handleChangeSearch(e)}
          value={search}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon
                style={{
                  color: "#009682"
                }}
              />
            </InputAdornment>
          }
        />
      </form>
    );
  }
}

export default SearchArticles;
