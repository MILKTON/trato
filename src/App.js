import './App.css';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Transfer from './Components/Transfer';
import Home from './Components/Home';
import { PrivateRoute } from './_components/';
import LoginPage from './Components/LoginPage'
function App() {
  return (
    < >
      <Navigation/>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/transfer" component={Transfer} />
        <Route path="/login" component={LoginPage} />
      </Router>
      <Footer/>
    </>
  );
}

export default App;
