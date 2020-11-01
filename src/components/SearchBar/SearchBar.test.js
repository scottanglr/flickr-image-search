import { render } from "@testing-library/react";
import * as React from "react";
import SearchBar from "./SearchBar";

test("renders", () => {
  render(
    <SearchBar
      isSearching={false}
      searchInput={""}
      onChangeSearchInput={() => {}}
      onClickSearchSuggestionCallback={() => {}}
    />
  );
});
