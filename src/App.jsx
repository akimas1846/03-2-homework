import React, { useState, useEffect } from "react";
import Chart from "./Chart";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2004014/iris.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  // const data = [
  //   {
  //     sepalLength: 5.1,
  //     sepalWidth: 3.5,
  //     petalLength: 1.4,
  //     petalWidth: 0.2,
  //     species: "setosa",
  //   },
  //   {
  //     sepalLength: 4.9,
  //     sepalWidth: 3,
  //     petalLength: 1.4,
  //     petalWidth: 0.2,
  //     species: "setosa",
  //   },
  //   {
  //     sepalLength: 4.7,
  //     sepalWidth: 3.2,
  //     petalLength: 1.3,
  //     petalWidth: 0.2,
  //     species: "setosa",
  //   },
  //   {
  //     sepalLength: 7,
  //     sepalWidth: 3.2,
  //     petalLength: 4.7,
  //     petalWidth: 1.4,
  //     species: "versicolor",
  //   },
  //   {
  //     sepalLength: 6.4,
  //     sepalWidth: 3.2,
  //     petalLength: 4.5,
  //     petalWidth: 1.5,
  //     species: "versicolor",
  //   },
  //   {
  //     sepalLength: 6.9,
  //     sepalWidth: 3.1,
  //     petalLength: 4.9,
  //     petalWidth: 1.5,
  //     species: "versicolor",
  //   },
  //   {
  //     sepalLength: 6.3,
  //     sepalWidth: 2.7,
  //     petalLength: 4.9,
  //     petalWidth: 1.8,
  //     species: "virginica",
  //   },
  //   {
  //     sepalLength: 6.7,
  //     sepalWidth: 3.3,
  //     petalLength: 5.7,
  //     petalWidth: 2.1,
  //     species: "virginica",
  //   },
  //   {
  //     sepalLength: 7.2,
  //     sepalWidth: 3.2,
  //     petalLength: 6,
  //     petalWidth: 1.8,
  //     species: "virginica",
  //   },
  // ];
  return <Chart data={data} />;
}

export default App;
