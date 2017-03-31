import React, { Component } from 'react';
import PersonCard from '../components/PersonCard';
import PersonForm from '../components/PersonForm';

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }
  
  onEdit = () => this.setState({editing: true});
  onCancel = () => this.setState({editing: false});

  onSave = (person) => {
    return (
      this.props.onSave(person)
      .then(() => {
        this.setState({editing: false});
        return true;
      })
      .catch(() => false)
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

export default Person;