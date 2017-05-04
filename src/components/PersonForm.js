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

  onPropertyChanged = ({ target }) => this.setState(propertyChanged(target.id, target.value));

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
          onChange={this.onPropertyChanged}
          disabled={saving}
          isEmptyRequired={!person.firstname}
        />
        <Input id="lastname" type="text" label="last name"
          value={person.lastname}
          onChange={this.onPropertyChanged}
          disabled={saving}
          isEmptyRequired={!person.lastname}
        />
        <Input id="entity" type="text" label="entity"
          value={person.entity}
          onChange={this.onPropertyChanged}
          disabled={saving}
          isEmptyRequired={!person.entity}
        />
        <Input id="email" type="text" label="email"
          value={person.email}
          onChange={this.onPropertyChanged}
          disabled={saving}
          isEmptyRequired={!person.email}
          hasError={!isEmail(person.email)}
          errorMessage={person.email ? 'please enter a valid email address' : ''}
        />
        <Input id="phone" type="text" label="phone"
          value={person.phone}
          onChange={this.onPropertyChanged}
          disabled={saving}
          isEmptyRequired={!person.phone}
        />
      </Card>
    );
  }
}

export default PersonForm;