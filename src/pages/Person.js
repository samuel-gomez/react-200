import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPersonById } from '../state';

import api from '../service/peopleBackend';
import PersonCard from '../components/PersonCard';
import PersonForm from '../components/PersonForm';

const mapStateToProps = (state, {match}) => ({
  person: getPersonById(state, match.params.id)
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

const enhance = connect(mapStateToProps, mapDispatchToProps);

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }
  
  onEdit = (e) => {
    e.preventDefault();
    this.setState({editing: true});
  }
  
  onCancel = () => this.setState({editing: false});

  onSave = (patch) => {
    const { person } = this.props;
    return (
      this.props.updatePerson(person.id, patch)
      .then(success => {
        success && this.setState({editing: false});
        return success;
      })
    );
  }
    
  render() {
    const { person } = this.props;
    const { editing } = this.state;
    return (
      <div className="card-container">
        { !person
        ? "not found :("
        : editing
        ? <PersonForm person={person} onCancel={this.onCancel} onSave={this.onSave} />
        : <PersonCard {...person} onEdit={this.onEdit} />
        }
      </div>
    );
  }
}

export default enhance(Person);