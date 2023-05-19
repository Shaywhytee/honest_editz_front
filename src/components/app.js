import React, { useContext } from "react";
import Home from "./pages/home";
import About from "./pages/about";
import Portfolio from "./pages/portfolio";
import Contact from "./pages/contact";
import NavBar from "./helpers/nav_bar";
import Footer from "./helpers/footer";
import EditHome from "./pages/auth_pages/edit_home";
import EditAbout from "./pages/auth_pages/edit_about";
import EditPortfolio from "./pages/auth_pages/edit_portfolio";
import EditContact from "./pages/auth_pages/edit_contact"; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AdminLogin from "./pages/auth_pages/auth";
import { AuthProvider } from "./pages/auth_pages/auth_context";
import { ContentProvider } from "./helpers/content_provider";
import PrivateRoute from "./helpers/private_route";


export default function App() {

  return (
    <Router>
      <AuthProvider>
        <ContentProvider>  
          <div className="app">
            <NavBar />
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route path="/auth" component={AdminLogin} />
              <Route path="/about" component={About} />
              <Route path="/portfolio" component={Portfolio} />
              <Route path="/contact" component={Contact} />
              <PrivateRoute exact path="/edit_home" component={EditHome} />
              <PrivateRoute path="/edit_about" component={EditAbout} />
              <PrivateRoute path="/edit_portfolio" component={EditPortfolio} />
              <PrivateRoute path="/edit_contact" component={EditContact} />
            </Switch>
            <Footer />
          </div>
        </ContentProvider>
      </AuthProvider>
    </Router>
  );
}
