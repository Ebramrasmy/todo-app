import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import NavigationBar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoForm from "./pages/To-Do";
import NotFound from "./pages/NotFound";
import Movies from "./pages/Movies/MoviesList";
import MovieDetails from "./pages/Movies/MovieDetails";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

import { LanguageContext } from "./context/LanguageContext";

function App() {
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    if (language === "ar") {
      document.body.dir = "rtl";
      document.body.style.textAlign = "right";
    } else {
      document.body.dir = "ltr";
      document.body.style.textAlign = "left";
    }
  }, [language]);

  return (
    <BrowserRouter>
      <NavigationBar />
      <Container className="mt-4">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/favorites" component={Favorites} exact />
          <Route path="/movies/:id" component={MovieDetails} exact />
          <Route path="/movies" component={Movies} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/todo" component={TodoForm} exact />
          <Route path="*" component={NotFound} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
