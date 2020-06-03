import React, { useEffect, useState } from "react";
import getAll from "./api/stateIsoAPI";
import logo from "./logo.svg";
import "./App.css";
import stateIsoAPI from "./api/stateIsoAPI";

function App() {
  const [states, setStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [stateName, setStateName] = useState("");
  const [doSearch, setDoSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

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
    const statesSearch = filterResults(states);
    setFilteredStates(statesSearch);
  }, [states, stateName]);

  const filterResults = results => {
    return results.filter(result => result.name.startsWith(stateName));
  };

  return (
    <div className="App">
      <pre>{JSON.stringify(stateName, null, 2)}</pre>
      <pre>{JSON.stringify(filteredStates, null, 2)}</pre>
      <pre>{doSearch ? "busca" : "no busques"}</pre>
      <pre>{JSON.stringify(states, null, 2)}</pre>
      <input
        type="text"
        value={stateName}
        onChange={e => {
          setStateName(e.target.value);
          setDoSearch(true);
        }}
      />
      <div>
        { isSearching && <span>Buscando</span>}
        {filteredStates.length > 0 && stateName.length > 0 ? (
          filteredStates.map(state => {
            return <div key={state.code}>{state.name}</div>;
          })
        ) : (
          <div>not available states</div>
        )}
      </div>
    </div>
  );
}

export default App;
