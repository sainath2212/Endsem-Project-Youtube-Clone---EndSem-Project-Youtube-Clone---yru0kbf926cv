import "./index.css";
import * as React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import  Carousel  from "./Pages/Movies.jsx";

function App() {
  const [isLogin, setLogIn] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [userName, setUserName] = React.useState("");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Carousel/>
    },
    {
      path: "/signup/",
      element: <Signup/>
    },
    {
      path: "/signin/",
      element: <Signin setLogIn={setLogIn} setToken={setToken} setUserName={setUserName}/> 
    },
    {
      path: "/home/",
      element: <Carousel isLogin={isLogin} userName={userName}/>
    },

  ]);

  return <RouterProvider router={router} />;
}

export default App;