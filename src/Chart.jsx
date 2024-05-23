import React from "react";
import * as d3 from "d3";

function Chart({ data }) {
  const margin = { top: 20, right: 100, bottom: 50, left: 100 };
  const legendWidth = 120; // 凡例の幅
  const legendItemSize = 16; // 凡例アイテムのサイズ
  const legendItemSpacing = 8; // 凡例アイテム間のスペース
  const contentWidth = 400;
  const contentHeight = 400;

  // 色のスケールを設定
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // x軸のスケールを設定
  const xScale = d3
    .scaleLinear()
    .domain([4, Math.ceil(d3.max(data, (item) => item.sepalLength))]) // 始まりを4に変更し、最大値より大きい直近の整数まで表示
    .range([0, contentWidth]);

  // y軸のスケールを設定
  const yScale = d3
    .scaleLinear()
    .domain([2, d3.max(data, (item) => item.sepalWidth)]) // 縦軸の始まりを2、終わりを5に設定
    .range([contentHeight, 0]);

  // x軸の目盛りを作成
  const xAxisTicks = xScale.ticks().map((x) => (
    <g key={x} transform={`translate(${xScale(x)},0)`}>
      <line x1="0" y1="0" x2="0" y2={10} stroke="black" />
      <text y={25} textAnchor="middle">
        {x}
      </text>
    </g>
  ));

  // y軸の目盛りを作成
  const yAxisTicks = yScale.ticks().map((y, index) => (
    <g key={y} transform={`translate(0,${yScale(y)})`}>
      <line x1="0" y1="0" x2={-6} y2="0" stroke="black" />
      <text x={-10} y={0} dy="0.32em" textAnchor="end">
        {y.toFixed(1)}
      </text>
    </g>
  ));

  const svgWidth = margin.left + contentWidth + margin.right + legendWidth; // 凡例の幅を加えた幅
  const svgHeight = margin.top + contentHeight + margin.bottom; // 上下の余白を加えた高さ

  return (
    <svg width={svgWidth} height={svgHeight}>
      {/* x軸とそのラベル */}
      <g transform={`translate(${margin.left},${margin.top + contentHeight})`}>
        <g className="x-axis">
          {xAxisTicks}
          <text
            x={contentWidth / 2}
            y={50} // x軸ラベルの位置
            textAnchor="middle"
            fontWeight="bold"
          >
            Sepal Length
          </text>
          <line
            x1={0}
            y1={0}
            x2={contentWidth}
            y2={0}
            stroke="black"
          />
        </g>
      </g>

      {/* y軸とそのラベル */}
      <g transform={`translate(${margin.left},${margin.top})`}>
        <g className="y-axis">
          {yAxisTicks}
          <text
            transform={`rotate(-90)`}
            x={-contentHeight / 2}
            y={-70} // y軸ラベルの位置
            textAnchor="middle"
            fontWeight="bold"
          >
            Sepal Width
          </text>
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={contentHeight}
            stroke="black"
          />
        </g>

        {/* データ点の描画 */}
        {data.map((item, i) => (
          <circle
            key={i}
            cx={xScale(item.sepalLength)}
            cy={yScale(item.sepalWidth)}
            r={5}
            fill={color(item.species)} // speciesごとに色を変える
          />
        ))}

        {/* 凡例 */}
        <g transform={`translate(${margin.left + contentWidth + 20}, 20)`}>
          {color.domain().map((d, i) => (
            <g
              key={i}
              transform={`translate(0, ${
                i * (legendItemSize + legendItemSpacing)
              })`}
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
