import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

// import Navigation from './components/Navigation';
// import Bla from './components/Bla';
// import Parametros from './components/Parametros';
// import User from './components/User';
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Categorias from "./pages/Categorias";

function App() {
  return (
    <Router>
      <div className="container mt-5">
        {/* <h1>Prueba de Net Core React JS</h1> */}

       
        <div className="btn-group">
        <hr />
          <NavLink to="/" className="btn btn-dark" activeClassName="active">
            Productos
          </NavLink>
          <Link to="/categoria" className="btn btn-dark">
            Categorias
          </Link>
        </div>
        <hr />
        <div className="mt-5 text-center"><h1>Prueba de Net Core React JS</h1></div>
        <Routes>
          <Route exact path="/" element={<Productos />} />
          <Route exact path="/categoria" element={<Categorias />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
