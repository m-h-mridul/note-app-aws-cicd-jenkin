import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Add from "./components/Add.jsx";
import Update from "./components/Update.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    
    loader: () => fetch(`${process.env.address}`),
  },
  {
    path: "add",
    element: <Add />,
  },
  {
    path: "update/:id",
    element: <Update />,
    loader: ({ params }) => fetch(`http://localhost:3000/note/${params.id}`),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
