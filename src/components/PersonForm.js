import React, { Component } from 'react';
import Card from './Card';
import Input from './Input';

const propertyChanged = (property, value) => ({person}) => ({
  person: {...person, [property]: value}
});

class PersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: this.props.person,
      saving: false
    };
  }

  onFirstnameChanged = e => this.setState(propertyChanged('firstname', e.target.value));
  onLastnameChanged = e => this.setState(propertyChanged('lastname', e.target.value));
  onEntityChanged = e => this.setState(propertyChanged('entity', e.target.value));
  onEmailChanged = e => this.setState(propertyChanged('email', e.target.value));
  onPhoneChanged = e => this.setState(propertyChanged('phone', e.target.value));

  onSave = () => {
    this.setState({ saving: true });
    this.props.onSave(this.state.person)
    .then(success => {
      if (!success) {
        alert('something went wrong :(');
        this.setState({ saving: false });
      }
    });
  }
  
  render() {
    const { onCancel } = this.props;
    const { person, saving } = this.state;
    
    return (
      <Card actions={[
        <button type="button" className="btn btn-default" onClick={this.onSave} key="save" disabled={saving}>save</button>,
        <a onClick={onCancel} key="cancel">cancel</a>
      ]}>
        <Card.Title
          mainTitle={`${person.firstname} ${person.lastname}`}
        />
        <Input id="firstname" type="text" placeholder="first name"
          value={person.firstname}
          onChange={this.onFirstnameChanged}
          disabled={saving}
        />
        <Input id="lastname" type="text" placeholder="last name"
          value={person.lastname}
          onChange={this.onLastnameChanged}
          disabled={saving}
        />
        <Input id="entity" type="text" placeholder="entity"
          value={person.entity}
          onChange={this.onEntityChanged}
          disabled={saving}
        />
        <Input id="email" type="text" placeholder="email"
          value={person.email}
          onChange={this.onEmailChanged}
          disabled={saving}
        />
        <Input id="phone" type="text" placeholder="phone"
          value={person.phone}
          onChange={this.onPhoneChanged}
          disabled={saving}
        />
      </Card>
    );
  }
}

export default PersonForm;