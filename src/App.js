import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./styles.css";
import "react-notifications/lib/notifications.css";

import Header from "./components/Header/Navbar";
import Footer from "./components/Footer";
import { publicRoutes } from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        {publicRoutes.map((route, index) => (
          <Route
            exact={route.exact}
            path={route.path}
            component={route.component}
            key={index}
          />
        ))}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
