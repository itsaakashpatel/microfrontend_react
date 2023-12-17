import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import Header from "./components/header";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: shared</div>
    <Header title="Shared Header" subtitle="This is a shared header" />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
