import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import './App.css';

import { fetchPeople, updatePerson, loadPerson } from './service/people';

import Discover from './pages/Discover';
import ListAll from './pages/ListAll';
import Person from './pages/Person';

import AppBar from './components/AppBar';
import Spinner from './components/Spinner';


const mapStateToProps = state => ({
  people: state.people
});

const mapDispatchToProps = dispatch => ({
  fetchPeople: () => (
    fetchPeople()
      .then(people => {
        dispatch({ type: 'PEOPLE_RECEIVED', people });
      })
      .catch(e => {
        console.error('could not fetch people :(', e);
      })
  ),
  updatePerson: (id, patch) => (
    updatePerson(id, patch)
      .then(() => loadPerson(id))
      .then(person => {
        dispatch({ type: 'PERSON_RECEIVED', person });
        return true;
      })
      .catch(e => {
        console.error('could not save person :(', e);
        return false;
      })
  )
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

class App extends Component {
  componentDidMount() {
    this.props.fetchPeople();
  }

  render() {
    const { people, updatePerson } = this.props;
    return (
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
  }
} 

export default enhance(App);
