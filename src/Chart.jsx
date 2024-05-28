import React, { useState, useEffect } from "react";
import * as d3 from "d3";

function Chart({ data, xAxisAttribute, yAxisAttribute }) {
  const margin = { top: 20, right: 100, bottom: 50, left: 100 };
  const legendWidth = 120;
  const legendItemSize = 16;
  const legendItemSpacing = 8;
  const contentWidth = 400;
  const contentHeight = 400;

  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const [hiddenSeries, setHiddenSeries] = useState({});

  const toggleSeries = (series) => {
    const updatedHiddenSeries = { ...hiddenSeries, [series]: !hiddenSeries[series] };
    setHiddenSeries(updatedHiddenSeries);
  };

  useEffect(() => {
    const xScale = d3
      .scaleLinear()
      .domain([d3.min(data, (item) => item[xAxisAttribute]), d3.max(data, (item) => item[xAxisAttribute])])
      .range([0, contentWidth])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, (item) => item[yAxisAttribute]), d3.max(data, (item) => item[yAxisAttribute])])
      .range([contentHeight, 0])
      .nice();

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    d3.select(".x-axis")
      .transition().duration(1000)
      .call(xAxis);

    d3.select(".y-axis")
      .transition().duration(1000)
      .call(yAxis);

    const circles = d3.select(".circles")
      .selectAll("circle")
      .data(data);

    circles.enter().append("circle")
      .attr("cx", (d) => xScale(d[xAxisAttribute]))
      .attr("cy", (d) => yScale(d[yAxisAttribute]))
      .attr("r", 5)
      .attr("fill", (d) => color(d.species))
      .style("display", (d) => hiddenSeries[d.species] ? "none" : "initial")
      .merge(circles)
      .transition().duration(1000)
      .attr("cx", (d) => xScale(d[xAxisAttribute]))
      .attr("cy", (d) => yScale(d[yAxisAttribute]));

    circles.exit().remove();

  }, [data, xAxisAttribute, yAxisAttribute, hiddenSeries]);

  const svgWidth = margin.left + contentWidth + margin.right + legendWidth;
  const svgHeight = margin.top + contentHeight + margin.bottom;

  return (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <g className="x-axis" transform={`translate(0,${contentHeight})`} />
        <g className="y-axis" />
        <g className="circles">
          {data.map((item, i) => (
            <circle
              key={i}
              cx={0}
              cy={0}
              r={5}
              fill={color(item.species)}
              style={{ display: hiddenSeries[item.species] ? "none" : "initial" }}
            />
          ))}
        </g>
        <g transform={`translate(${contentWidth + 20},0)`}>
          {color.domain().map((d, i) => (
            <g
              key={i}
              onClick={() => toggleSeries(d)}
              transform={`translate(0, ${i * (legendItemSize + legendItemSpacing)})`}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={0}
                y={-legendItemSize / 2}
                width={legendItemSize}
                height={legendItemSize}
                fill={color(d)}
              />
              <text x={legendItemSize + 4} y={0} dy="0.32em">
                {d}
              </text>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}

export default Chart;
