import React, { useEffect } from "react";

function App() {
  const getData = async () => {
    const response = await fetch("/");
    const json = await response.json();
    console.log(json);
  };

  const getJson = async () => {
    const response = await fetch("/test");
    const json = await response.json();
    console.log("api", json);
  };
  useEffect(() => {
    getData();
    getJson();
  }, []);

  return <div className="App"></div>;
}

export default App;
