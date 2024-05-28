import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import PullDownBar from "./PullDownBar";

function App() {
  const [data, setData] = useState(null);
  const [xAxisAttribute, setXAxisAttribute] = useState("sepalLength");
  const [yAxisAttribute, setYAxisAttribute] = useState("sepalWidth");

  useEffect(() => {
    (async () => {
      const fetchData = await fetch(
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2004014/iris.json"
      );
      const jsData = await fetchData.json();
      setData(jsData);
    })();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PullDownBar
        xAxisAttribute={xAxisAttribute}
        setXAxisAttribute={setXAxisAttribute}
        yAxisAttribute={yAxisAttribute}
        setYAxisAttribute={setYAxisAttribute}
      />
      <Chart data={data} xAxisAttribute={xAxisAttribute} yAxisAttribute={yAxisAttribute} />
    </div>
  );
}

export default App;
