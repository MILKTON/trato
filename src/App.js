import './App.css';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import Body from './Components/Body';
import { Route, Switch } from 'react-router-dom';
import Transfer from './Components/Transfer';
import Home from './Components/Home';
import { PrivateRoute } from './_components/';
import LoginPage from './Components/LoginPage'
function App() {
  return (
    < >
      <Navigation/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/transfer" component={Transfer} />
        <Route path="/login" component={LoginPage} />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
