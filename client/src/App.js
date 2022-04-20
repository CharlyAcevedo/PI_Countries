import { Route, BrowserRouter as Router } from 'react-router-dom';
import Landing from './components/landing/Landing';
import Nav from './components/nav/Nav';
import Home from './components/home/Home';
import CountryDetails from './components/countryDetails/CountryDetails';
import Activities from './components/activities/Activities';
import CreateActivity from './components/activities/CreateActivity';
import ActivityDetails from './components/activityDetails/ActivityDetails'

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">        
          <Route exact path='/' component={Landing} />
          <Route path='/home' component={Nav} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/home/country_detail/:country_id' component={CountryDetails} />
          <Route exact path='/home/activities' component={Activities}/>
          <Route exact path='/home/activity_details/:id' component={ActivityDetails}/>
          <Route exact path='/home/create_activity' component={CreateActivity}/>
      </div>
    </Router>
  );
}

export default App;
