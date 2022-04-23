import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { AppHeader } from './cmps/AppHeader';
import { Favorites } from './pages/Favorites';
import { WeatherApp } from './pages/WeatherApp';

export function App() {
  return (
    <Router>
      <AppHeader />
      <main className='container'>
        <Switch>
          <Route path='/favorites' component={Favorites} />
          <Route path='/' component={WeatherApp} />
        </Switch>
      </main>
    </Router>
  );
}
