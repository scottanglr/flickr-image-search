import * as React from "react";
import "./Search.css";
import Gallery from "../Gallery/Gallery";
import SearchBar from "../SearchBar/SearchBar";
import flickrLogo from "./flickr-logo.png";

/**
 * When the currentSearch changes, send it to the server and set the search results
 * @param {string} currentSearch - search query the server
 * @param {(string) => void} setErrorMessage
 * @param {(Object) => void} setResults
 */
const useAutoSearch = (currentSearch, setErrorMessage, setResults) => {
  const [isSearching, setIsSearching] = React.useState(false);

  //
  React.useEffect(() => {
    if (currentSearch) {
      setIsSearching(true);
      setResults(null);
      setErrorMessage(null);
      (async () => {
        try {
          const response = await window.fetch(
            `/api/search?query=${currentSearch}`
          );
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const results = await response.json();
          setIsSearching(false);
          setResults(results);
        } catch (e) {
          setErrorMessage("Request failed: " + e.message);
        }
      })();
    }
  }, [currentSearch, setErrorMessage, setResults]);
  return [isSearching];
};

/**
 * Debounce the user's input and set the currentSearch after typing
 * @param {(string) => void} updateSearch - Sets the currentSearch to current state of the input
 * @param {(string) => void} setSearchInput
 */
const useSearchInputDebounce = (setCurrentSearch, setSearchInput) => {
  const debounceTimerRef = React.useRef(null);

  const clearDebounceTimerCallback = React.useCallback(() => {
    if (debounceTimerRef.current !== null) {
      clearTimeout(debounceTimerRef.current);
    }
  }, []);

  let onChangeInput;
  onChangeInput = React.useCallback(
    (e) => {
      const newText = e.target.value;
      setSearchInput(newText);
      clearDebounceTimerCallback();
      debounceTimerRef.current = setTimeout(() => {
        if (newText !== "") {
          setCurrentSearch(newText);
        }
        debounceTimerRef.current = null;
      }, 1000);
    },
    [setCurrentSearch, clearDebounceTimerCallback, setSearchInput]
  );
  return [onChangeInput, clearDebounceTimerCallback];
};

/**
 * Component which encapsulates all search functionality
 */
const Search = () => {
  const [currentSearch, setCurrentSearch] = React.useState("");
  const [results, setResults] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [keepSearchBarUp, setKeepSearchBarUp] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");

  // Search when currentSearch changes
  const [isSearching] = useAutoSearch(
    currentSearch,
    setErrorMessage,
    setResults
  );

  // If the user has seen results previously, keep the search box up high with padding above it
  React.useEffect(() => {
    if (results && Array.isArray(results.items)) {
      setKeepSearchBarUp(true);
    }
  }, [results]);

  // Wait until after the user has finished typing and then set the current search
  const [
    onChangeSearchInput,
    clearSearchInputDebounce,
  ] = useSearchInputDebounce(setCurrentSearch, setSearchInput);

  // If the user submits in the field by hitting enter, submit right away
  const onSubmitFormCallback = React.useCallback(
    (e) => {
      e && e.preventDefault(); // Stop refreshing of page
      clearSearchInputDebounce();
      setCurrentSearch(searchInput);
      return false;
    },
    [clearSearchInputDebounce, searchInput]
  );

  // Set the current search to selected text suggestion
  const onClickSearchSuggestionCallback = React.useCallback(
    (suggestion) => {
      clearSearchInputDebounce();
      setSearchInput(suggestion);
      setCurrentSearch(suggestion);
    },
    [clearSearchInputDebounce, setCurrentSearch, setSearchInput]
  );

  return (
    <>
      <div
        className={
          "Search-container d-flex align-items-center flex-column w-100 container-fluid" +
          (keepSearchBarUp
            ? " pt-5 justify-content-start"
            : " justify-content-center")
        }
      >
        <div
          className={
            "d-flex align-items-center mb-5 justify-content-center flex-wrap"
          }
        >
          <img
            src={flickrLogo}
            className={"Search-flickr-logo pr-3 mb-1"}
            alt="flickr logo"
          />
          <h1 className={"my-0 Search-image-search-heading"}>Image Search</h1>
        </div>
        <form className={"w-100"} onSubmit={onSubmitFormCallback}>
          <SearchBar
            isSearching={isSearching}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            onChangeSearchInput={onChangeSearchInput}
            onClickSearchSuggestionCallback={onClickSearchSuggestionCallback}
          />
        </form>
        {errorMessage !== null && (
          <div className={"text-danger"}>{errorMessage}</div>
        )}
        {results && (
          <>
            {Array.isArray(results.items) && (
              <div className={"w-100"}>
                <div className={"my-3"}>
                  <div>
                    <strong>{results.title}</strong>
                  </div>
                  <small>
                    <em>{results.items.length} results found</em>
                  </small>
                </div>
                <Gallery items={results.items} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Search;
