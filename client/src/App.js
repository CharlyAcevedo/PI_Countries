import { Route, BrowserRouter as Router } from 'react-router-dom';
import Landing from './components/landing/Landing';
import Nav from './components/nav/Nav';
import Home from './components/home/Home';
import CountryDetails from './components/countryDetails/CountryDetails'

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">        
          <Route exact path='/' component={Landing} />
          <Route path='/home' component={Nav} />
          <Route exact path='/home' component={Home} />
          <Route path='/home/country_detail/:country_id' component={CountryDetails} />
          <Route exact path='/home/activities'/>
          <Route exact path='/home/activities/create_activity' />
      </div>
    </Router>
  );
}

export default App;
