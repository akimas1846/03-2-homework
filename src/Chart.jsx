import React from "react";
import * as d3 from "d3";

function Chart({ data }) {
  const leftMargin = 100;
  const rightMargin = 100;
  const contentWidth = 400;
  const contentHeight = 400; // チャートの高さを400に修正
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // x軸のスケールを設定
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (item) => item.sepalLength)])
    .range([0, contentWidth]);

  // y軸のスケールを設定
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (item) => item.sepalWidth)])
    .range([contentHeight, 0]); // y軸は上から下にスケールするために修正

  const svgWidth = leftMargin + contentWidth + rightMargin;
  const svgHeight = contentHeight;

  return (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${leftMargin},0)`}>
        {data.map((item, i) => (
          <circle
            key={i}
            cx={xScale(item.sepalLength)}
            cy={yScale(item.sepalWidth)}
            r={5}
            fill={color(item.species)}
          />
        ))}
      </g>
    </svg>
  );
}

export default Chart;
