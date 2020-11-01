import searchIcon from "../Search/search-solid.svg";
import loadingCircle from "../Search/circle-notch-solid.svg";
import SearchSuggestions from "../SearchSuggestions/SearchSuggestions";
import * as React from "react";
import "./SearchBar.css";

/**
 * Component to render the search bar
 @param {boolean} props.isSearching
 @param {string} props.searchInput
 @param {(e)=>void} props.onChangeSearchInput - A function to be applied to the input element to set searchInput on change
 @param {(string)=>void} props.onClickSearchSuggestionCallback - Sets the current search upon clicking a suggestion
 */
const SearchBar = (props) => {
  const {
    isSearching,
    searchInput,
    onChangeSearchInput,
    onClickSearchSuggestionCallback,
  } = props;
  return (
    <>
      <div className="w-100 position-relative">
        {/*Label for screen readers only*/}
        <label className={"sr-only"} htmlFor="search-input">
          Image Search
        </label>
        <input
          id={"search-input"}
          type="text"
          onChange={onChangeSearchInput}
          value={searchInput}
          maxLength={100}
          className={
            "form-control w-100 border-0 SearchBar-input position-relative"
          }
          placeholder={"Search for anything"}
        />
        {/*Line appears when input is focussed*/}
        <div
          className={"SearchBar-focus-line position-relative"}
          role={"presentation"}
        />
        <div className={"SearchBar-icon-wrapper"}>
          {!isSearching && (
            <img
              aria-label={"Is Not Searching"}
              src={searchIcon}
              className={"SearchBar-icon"}
              alt="Search Icon"
            />
          )}
          {isSearching && (
            <img
              aria-label={"Is Searching"}
              src={loadingCircle}
              className={"SearchBar-loading-indicator"}
              alt="Loading Indicator"
            />
          )}
        </div>
      </div>
      <SearchSuggestions
        onClickSearchSuggestionCallback={onClickSearchSuggestionCallback}
      />
    </>
  );
};

export default SearchBar;
