import "./index.css";
import * as React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import  Carousel  from "./Pages/Corousal.jsx";

function App() {
  const [isLogin, setLogIn] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const toggleLogin = () => {
    setLogIn(prev => !prev);
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Carousel isLogin={isLogin} setLogIn={toggleLogin}/>
    },
    {
      path: "/signup/",
      element: <Signup/>
    },
    {
      path: "/signin/",
      element: <Signin setLogIn={setLogIn} setToken={setToken} setUserName={setUserName}/> 
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;