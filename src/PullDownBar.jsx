import React from "react";

function PullDownBar({ xAxisAttribute, setXAxisAttribute, yAxisAttribute, setYAxisAttribute }) {
  const attributes = ["sepalLength", "sepalWidth", "petalLength", "petalWidth"];

  return (
    <div>
      <label>
        X:
        <select value={xAxisAttribute} onChange={(e) => setXAxisAttribute(e.target.value)}>
          {attributes.map((attr) => (
            <option key={attr} value={attr}>
              {attr}
            </option>
          ))}
        </select>
      </label>
      <label>
        Y:
        <select value={yAxisAttribute} onChange={(e) => setYAxisAttribute(e.target.value)}>
          {attributes.map((attr) => (
            <option key={attr} value={attr}>
              {attr}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default PullDownBar;
