import React, { useEffect, useState } from "react";
import getAll from "./api/stateIsoAPI";
import logo from "./logo.svg";
import "./App.css";
import stateIsoAPI from "./api/stateIsoAPI";
import OptionList from "./components/OptionList";

function App() {
  const [states, setStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [stateName, setStateName] = useState("");
  const [doSearch, setDoSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
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
        setSelected(selected + 1);
        break;
      case 38:
        setSelected(selected - 1);
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
    <div className="App">
      <pre>{JSON.stringify(showOptionList)}</pre>
      {/*<pre>{JSON.stringify(stateName, null, 2)}</pre>*/}
      {/*<pre>{JSON.stringify(filteredStates, null, 2)}</pre>*/}
      {/*<pre>{doSearch ? "busca" : "no busques"}</pre>*/}
      {/*<pre>{JSON.stringify(states, null, 2)}</pre>*/}
      <input
        type="text"
        value={stateName}
        onChange={e => {
          setStateName(e.target.value);
          setDoSearch(true);
          setShowOptionList((e.target.value.length > 0));
        }}
        onKeyDownCapture={changeSelection}
      />
      <div>
        {isSearching && <span>Buscando</span>}
        {filteredStates.length > 0 && stateName.length > 0 && showOptionList && (
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
    </div>
  );
}

export default App;
