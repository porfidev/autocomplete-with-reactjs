import React from "react";

function optionWithHighlightSearch(option, highlight) {
  const bold = option.substr(0, highlight.length);
  const rest = option.substr(highlight.length);
  return (
    <span>
      <strong>{bold}</strong>
      {rest}
    </span>
  );
}

function isSelected(index, selected) {
  return index === selected;
}

function OptionList({ options, searchString, onSelect, selected }) {
  if (!options.length) {
    return null;
  }

  return options.map((state, index) => {
    return (
      <div
        key={state.code}
        onClick={() => onSelect(state.name)}
        style={{
          backgroundColor: isSelected(selected, index) ? "red" : "transparent"
        }}
      >
        {optionWithHighlightSearch(state.name, searchString)}
      </div>
    );
  });
}

export default OptionList;
