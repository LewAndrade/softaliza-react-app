import React from "react";
import { NavLink, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import EventFormPage from "./pages/event-form-page";
import EventListPage from "./pages/event-list-page";
const App = () => {
  return (
    <Container>
      <div className="ui two item menu">
        <NavLink className="item" activeClassName="active" exact to="/">
          Lista de Eventos
        </NavLink>
        <NavLink
          className="item"
          activeClassName="active"
          exact
          to="/events/new"
        >
          Adicionar Evento
        </NavLink>
      </div>
      <Route exact path="/" component={EventListPage} />
      <Route path="/events/new" component={EventFormPage} />
      <Route path="/events/edit/:id" component={EventFormPage} />
    </Container>
  );
};

export default App;
