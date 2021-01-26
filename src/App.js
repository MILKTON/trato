import './App.css';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import { Route, Switch, withRouter } from 'react-router-dom';
import React, { useState, useMemo } from "react";
import Transfer from './Components/Transfer';
import Home from './Components/Home';
import LoginPage from './Components/LoginPage'
import { UserContext } from "./userContext";

const App = withRouter(({location}) => {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    < >
      {
        location.pathname !== '/login' && <Navigation/>
      }
      <UserContext.Provider value={value}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/transfer" component={Transfer} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </UserContext.Provider>

      {
        location.pathname !== '/login' &&  <Footer/>
      }
    </>
  );
})

export default App;
