import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import { fetchPeople, updatePerson, loadPerson } from './service/people';

import Discover from './pages/Discover';
import ListAll from './pages/ListAll';
import Person from './pages/Person';

import AppBar from './components/AppBar';
import Spinner from './components/Spinner';


const replaceOrInsert = person => ({ people }) => {
  const personIndex = people.findIndex(p => p.id === person.id);
  if (personIndex >= 0) {
    return {
      people: [...people.slice(0, personIndex), person, ...people.slice(personIndex + 1)]
    }
  } else {
    return {
      people: [person, ...people]
    }
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: null
    };
  }

  componentDidMount() {
    this.fetchPeople();
  }

  fetchPeople() {
    return (
      fetchPeople()
      .then(people => {
        this.setState({ people });
        return true;
      })
      .catch(e => {
        console.error('could not fetch people :(', e);
        return false;
      })
    );
  }

  updatePerson(id, patch) {
    return (
      updatePerson(id, patch)
      .then(() => this.loadPerson(id))
      .catch(e => {
        console.error('could not save person :(', e);
        return false;
      })
    );
  }

  loadPerson(id) {
    return (
      loadPerson(id)
      .then(person => {
        this.setState(replaceOrInsert(person));
        return true;
      })
      .catch(e => {
        console.error('could not fetch people :(', e);
        return false;
      })
    );  
  }

  onSave = (id, patch) => this.updatePerson(id, patch);

  render() {
    const { people } = this.state;
    return (
      <div className="App">
        <header>
          <AppBar />
        </header>
        <main>
          { people === null
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
                  onSave={this.onSave} />
              } />
              <Redirect to="/all" />
            </Switch>
          }
        </main>
      </div>
    );
  }
} 

export default App;
