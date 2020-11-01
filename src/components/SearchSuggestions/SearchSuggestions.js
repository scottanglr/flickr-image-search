import * as React from "react";

/**
 * Component to render search suggestions
 @param {string} props.suggestion
 @param {string} props.extraClassName - An optional string to add to the className
 @param {(e)=>void} props.onClickSearchSuggestionCallback - Sets the search to the suggestion text
 */
const SearchSuggestion = (props) => {
  const { suggestion, extraClassName, onClickSearchSuggestionCallback } = props;
  return (
    <button
      onClick={() => {
        onClickSearchSuggestionCallback(suggestion);
      }}
      type={"button"}
      className={"btn btn-link" + (extraClassName ? " " + extraClassName : "")}
    >
      {suggestion}
    </button>
  );
};

// Use React.memo to separate rendering SearchSuggestions when input is changed
const SearchSuggestions = React.memo((props) => {
  const { onClickSearchSuggestionCallback } = props;
  return (
    <div className={"text-center"}>
      <SearchSuggestion
        onClickSearchSuggestionCallback={onClickSearchSuggestionCallback}
        suggestion={"Flower"}
      />
      <SearchSuggestion
        onClickSearchSuggestionCallback={onClickSearchSuggestionCallback}
        suggestion={"Bird"}
      />
      <SearchSuggestion
        onClickSearchSuggestionCallback={onClickSearchSuggestionCallback}
        suggestion={"Trees"}
      />
      <SearchSuggestion
        onClickSearchSuggestionCallback={onClickSearchSuggestionCallback}
        extraClassName={"d-none d-sm-inline-block"}
        suggestion={"Rain"}
      />
      <SearchSuggestion
        onClickSearchSuggestionCallback={onClickSearchSuggestionCallback}
        extraClassName={"d-none d-sm-inline-block"}
        suggestion={"Australia"}
      />
      <SearchSuggestion
        onClickSearchSuggestionCallback={onClickSearchSuggestionCallback}
        extraClassName={"d-none d-sm-inline-block"}
        suggestion={"Landscape"}
      />
      <SearchSuggestion
        onClickSearchSuggestionCallback={onClickSearchSuggestionCallback}
        extraClassName={"d-none d-lg-inline-block"}
        suggestion={"Wattle"}
      />
      <SearchSuggestion
        onClickSearchSuggestionCallback={onClickSearchSuggestionCallback}
        extraClassName={"d-none d-lg-inline-block"}
        suggestion={"Forest"}
      />
    </div>
  );
});
SearchSuggestions.displayName = "SearchSuggestions";

export default SearchSuggestions;
