import React from "react";
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ListTeam from "./pages/list";
import AddTeam from "./pages/add";
import EditTeam from "./pages/edit";

import "./index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListTeam />,
  },
  {
    path: "add",
    element: <AddTeam />,
  },
  {
    path: "edit/:id",
    element: <EditTeam />,
  },
]);

const App = () => (
  <RouterProvider router={router}>
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <div>Name: team</div>
      <div>Framework: react</div>
      <div>Language: JavaScript</div>
      <div>CSS: Tailwind</div>
    </div>
  </RouterProvider>
);
ReactDOM.render(<App />, document.getElementById("app"));
