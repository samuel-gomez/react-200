import React, { Component } from 'react';
import Card from './Card';
import Input from './Input';

const propertyChanged = (property, value) => ({person}) => ({
  person: { ...person, [property]: value },
  canSubmit: !!value
});

const isEmail = (value) => (
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
).test(value);

class PersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: this.props.person,
      saving: false,
      canSubmit: true
    };
  }

  onFirstnameChanged = v => this.setState(propertyChanged('firstname', v));
  onLastnameChanged = v => this.setState(propertyChanged('lastname', v));
  onEntityChanged = v => this.setState(propertyChanged('entity', v));
  onEmailChanged = v => this.setState(propertyChanged('email', v));
  onPhoneChanged = v => this.setState(propertyChanged('phone', v));

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
    const { person, saving, canSubmit } = this.state;
    
    return (
      <Card actions={[
        <button type="button" className="btn btn-default" onClick={this.onSave} key="save" disabled={saving || !canSubmit}>save</button>,
        <a onClick={onCancel} key="cancel">cancel</a>
      ]}>
        <Card.Title
          mainTitle={`${person.firstname} ${person.lastname}`}
        />
        <Input id="firstname" type="text" label="first name"
          value={person.firstname}
          onChange={this.onFirstnameChanged}
          disabled={saving}
          isEmptyRequired={!person.firstname}
        />
        <Input id="lastname" type="text" label="last name"
          value={person.lastname}
          onChange={this.onLastnameChanged}
          disabled={saving}
          isEmptyRequired={!person.lastname}
        />
        <Input id="entity" type="text" label="entity"
          value={person.entity}
          onChange={this.onEntityChanged}
          disabled={saving}
          isEmptyRequired={!person.entity}
        />
        <Input id="email" type="text" label="email"
          value={person.email}
          onChange={this.onEmailChanged}
          disabled={saving}
          isEmptyRequired={!person.email}
          hasError={!isEmail(person.email)}
          errorMessage={person.email ? 'please enter a valid email address' : ''}
        />
        <Input id="phone" type="text" label="phone"
          value={person.phone}
          onChange={this.onPhoneChanged}
          disabled={saving}
          isEmptyRequired={!person.phone}
        />
      </Card>
    );
  }
}

export default PersonForm;