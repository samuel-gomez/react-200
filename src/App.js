import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import './App.css';

import Discover from './pages/Discover';
import ListAll from './pages/ListAll';
import Person from './pages/Person';

import AppBar from './components/AppBar';
import Spinner from './components/Spinner';


const mapStateToProps = state => ({
  peopleLoaded: state.people.all.length > 0
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps)
);

const App = ({ peopleLoaded }) => (
  <div className="App">
    <header>
      <AppBar />
    </header>
    <main>
      { !peopleLoaded
      ? <Spinner />
      : <Switch>
          <Route path="/all" component={ListAll} />
          <Route path="/discover" component={Discover} />
          <Route path="/person/:id" component={Person} />
          <Redirect to="/all" />
        </Switch>
      }
    </main>
  </div>
);

export default enhance(App);
