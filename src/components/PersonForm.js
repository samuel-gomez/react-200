import React, { Component } from 'react';
import { Form }  from 'formsy-react';
import { Prompt } from 'react-router-dom';
import Card from './Card';
import Input from './Input';

class PersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      canSubmit: undefined,
      dirty: false,
      personName: `${props.person.firstname} ${props.person.lastname}`
    };
  }

  onSubmit = (model, resetModel) => {
    this.setState({ saving: true });
    
    this.props.onSave(model)
    .then(success => {
      if (!success) {
        alert('something went wrong :(');
        resetModel();
        this.setState({ saving: false });
      }
    });
  }

  onFormValid = () => this.setState({ canSubmit: true });
  onFormInvalid = () => this.setState({ canSubmit: false });
  onChange  = (model, isDirty) => this.setState({
    personName: `${model.firstname} ${model.lastname}`,
    dirty: isDirty
  });
  
  render() {
    const { onCancel, person } = this.props;
    const { saving, canSubmit, dirty, personName } = this.state;
    
    return (
      <Form
        disabled={saving}
        onValidSubmit={this.onSubmit}
        onValid={this.onFormValid}
        onInvalid={this.onFormInvalid}
        onChange={this.onChange}
      >
        <Card actions={[
          <button type="submit" className="btn btn-default" key="save" disabled={!dirty || saving || !canSubmit}>save</button>,
          <a onClick={onCancel} key="cancel">cancel</a>
        ]}>
          <Card.Title
            mainTitle={personName}
          />
          <Input name="firstname" label="first name" type="text" value={person.firstname} required />          
          <Input name="lastname" label="last name" type="text" value={person.lastname} required />
          <Input name="entity" label="entity" type="text" value={person.entity} required />
          <Input name="email" label="email" type="text" value={person.email}
                 validations="isEmail" validationError="please enter a valid email address" required />
          <Input name="phone" label="phone" type="text" value={person.phone}
                 validations="isFrenchPhoneNumber" validationError="please enter a valid french phone number" required />
        </Card>
        <Prompt
          when={dirty}
          message={location => (
            `Are you sure you want to go to ${location.pathname}`
          )}
        />
      </Form>
    );
  }
}

export default PersonForm;