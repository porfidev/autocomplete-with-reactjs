import React, { useEffect, useState } from "react";
import "./styles/styles.scss";
import stateIsoAPI from "./api/stateIsoAPI";
import OptionList from "./components/OptionList";
import loadingIcon from "./103.gif";

function App() {
  const [states, setStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [stateName, setStateName] = useState("");
  const [doSearch, setDoSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(true);
  const [selected, setSelected] = useState(-1);
  const [showOptionList, setShowOptionList] = useState(false);

  useEffect(() => {
    if (doSearch === false) {
      return () => {};
    }

    (async function fetchData() {
      setIsSearching(true);
      const results = await stateIsoAPI();
      console.log("api result");
      setStates(results);
      setIsSearching(false);
    })();
  }, [doSearch]);

  useEffect(() => {
    if (doSearch === false) {
      return () => {};
    }

    const statesSearch = filterResults(states);
    setFilteredStates(statesSearch);
  }, [states, stateName]);

  const filterResults = results => {
    return results.filter(result => result.name.startsWith(stateName));
  };

  const changeSelection = event => {
    switch (event.keyCode) {
      case 40:
        event.preventDefault();
        if (showOptionList) {
          setSelected(selected + 1);
        }
        break;
      case 38:
        event.preventDefault();
        if (showOptionList) {
          setSelected(selected - 1);
        }
        break;
      case 13:
        event.preventDefault();
        if (selected > -1) {
          setStateName(filteredStates[selected].name);
          setSelected(-1);
          setShowOptionList(false);
        }
    }
  };

  return (
    <div className="App" onClick={() => setShowOptionList(false)}>
      <div className="content">
        <input
          className="searchInput"
          type="text"
          value={stateName}
          onChange={e => {
            setStateName(e.target.value);
            setDoSearch(true);
            setShowOptionList(e.target.value.length > 0);
          }}
          onKeyDownCapture={changeSelection}
          placeholder="Ingresa una Entidad Federativa"
        />
        {isSearching && stateName.length > 0 && (
          <div className="optionListContainer">
            <div
              style={{
                height: '3em',
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <img alt="loading-icon" src={loadingIcon} />
            </div>
          </div>
        )}

        {!isSearching &&
          filteredStates.length > 0 &&
          stateName.length > 0 &&
          showOptionList && (
            <div className="optionListContainer">
              {isSearching && (
                <div
                  style={{
                    height: "3em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <img src={loadingIcon} />
                </div>
              )}
              {filteredStates.length > 0 &&
                stateName.length > 0 &&
                showOptionList && (
                  <OptionList
                    options={filteredStates}
                    searchString={stateName}
                    onSelect={name => {
                      console.log("ON SELECT");
                      setStateName(name);
                      setSelected(-1);
                      setShowOptionList(false);
                    }}
                    selected={selected}
                  />
                )}
            </div>
          )}
      </div>
    </div>
  );
}

export default App;
