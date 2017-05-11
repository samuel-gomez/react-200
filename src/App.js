import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import './App.css';

import api from './service/peopleBackend';

import Discover from './pages/Discover';
import ListAll from './pages/ListAll';
import Person from './pages/Person';

import AppBar from './components/AppBar';
import Spinner from './components/Spinner';


const mapStateToProps = state => ({
  people: state.people
});

const mapDispatchToProps = dispatch => ({
  updatePerson: (id, patch) => api.updatePerson(dispatch)(id, patch)
    .then(err => {
      if (err !== null) {
        console.error('could not save person :(', err);
        return false;
      }
      return true;
    })
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

const App = ({ people, updatePerson }) => (
  <div className="App">
    <header>
      <AppBar />
    </header>
    <main>
      { people.length === 0
      ? <Spinner />
      : <Switch>
          <Route path="/all" render={() =>
            <ListAll people={people} />
          } />
          <Route path="/discover" render={() =>
            <Discover people={people} />
          } />
          <Route path="/person/:id" render={({match}) =>
            <Person
              person={people.find(person => person.id === match.params.id)}
              onSave={updatePerson} />
          } />
          <Redirect to="/all" />
        </Switch>
      }
    </main>
  </div>
);

export default enhance(App);
