import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/Home';
import Results from './components/Results';
import ErrorPage from './components/ErrorPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "results/",
    element: <Results />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);