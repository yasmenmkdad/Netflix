// import { useContext, useEffect } from "react";

// // react-router components
// import { Route, useLocation } from "react-router-dom";

// import HomeEn from "pages/Home/HomeEn";
// import Login from "pages/login/Login";
// import { AuthContext } from "./context/authContext/AuthContext";

// export default function App() {
//   const { pathname } = useLocation();
//   const { user } = useContext(AuthContext);

//   // Setting page scroll to 0 when changing the route
//   useEffect(() => {
//     document.documentElement.scrollTop = 0;
//     document.scrollingElement.scrollTop = 0;
//   }, [pathname]);

//   return <Route path="/login">{user ? <HomeEn /> : <Login />}</Route>;
// }

import "./app.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  Link,
  useLocation,
} from "react-router-dom";

import Login from "./pages/login/Login";
import { AuthContext, AuthContextProvider } from "./context/authContext/AuthContext";
import React, { useContext, useEffect } from "react";

import HomeEn from "pages/Home/HomeEn";
import Dashboard from "layouts/dashboard";
import { MovieContextProvider } from "context/movieContext/MovieContext";
import { ListContextProvider } from "context/listContext/ListContext";
import { UserContextProvider } from "context/UserContext/UserContext";

export default function App() {
  const { user } = useContext(AuthContext);

  // const { user } = useContext(AuthContext);
  // const { pathname } = useLocation();

  // // Setting page scroll to 0 when changing the route
  // useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  // }, [pathname]);
  // console.log("user",user)

  return (
    <React.StrictMode>
      <AuthContextProvider>
        <UserContextProvider>
        <MovieContextProvider>
          <ListContextProvider>
            {user ? <HomeEn/> : <Login />}
          </ListContextProvider>
        </MovieContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </React.StrictMode>
  );
}
