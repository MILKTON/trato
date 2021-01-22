import './App.css';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import Body from './Components/Body';
import { Route, Switch, withRouter } from 'react-router-dom';
import Transfer from './Components/Transfer';
import Home from './Components/Home';
import LoginPage from './Components/LoginPage'
const App = withRouter(({location}) => {
  console.log(location)
  return (
    < >
      {
        location.pathname !== '/login' && <Navigation/>
      }
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/transfer" component={Transfer} />
        <Route path="/login" component={LoginPage} />
      </Switch>
      {
        location.pathname !== '/login' &&  <Footer/>
      }
    </>
  );
})

export default App;
