import { render } from "@testing-library/react";
import * as React from "react";
import SearchSuggestions from "./SearchSuggestions";

test("renders", () => {
  render(
    <SearchSuggestions
      suggestion={"test"}
      extraClassName={"d-none"}
      onClickSearchSuggestionCallback={() => {}}
    />
  );
});
