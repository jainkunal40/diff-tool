import React from "react";
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import "./App.scss";
import { Route } from "react-router-dom";
import CommiteView from './pages/commitView';
import Home from './pages/home'

const App = () => {
  return (
    <div>
      <Navbar color="inverse" light expand="md">
        <NavbarBrand href="/">Difference Tool</NavbarBrand>
        <Collapse isOpen={true} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Route exact={true} path="/" component={Home} />
      <Route path="/commiteView" component={CommiteView} />
    </div>
  );
};

export default App;
