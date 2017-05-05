import React, { Component } from 'react';
import { Form }  from 'formsy-react';
import Card from './Card';
import Input from './Input';

class PersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      canSubmit: undefined,
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
  onChange  = (model) => this.setState({ personName: `${model.firstname} ${model.lastname}` })
  
  render() {
    const { onCancel, person } = this.props;
    const { saving, canSubmit, personName } = this.state;
    
    return (
      <Form
        disabled={saving}
        onValidSubmit={this.onSubmit}
        onValid={this.onFormValid}
        onInvalid={this.onFormInvalid}
        onChange={this.onChange}
      >
        <Card actions={[
          <button type="submit" className="btn btn-default" key="save" disabled={saving || !canSubmit}>save</button>,
          <a onClick={onCancel} key="cancel">cancel</a>
        ]}>
          <Card.Title
            mainTitle={personName}
          />
          <Input name="firstname" label="first name" type="text" value={person.firstname} required />          
          <Input name="lastname" label="last name" type="text" value={person.lastname} required />
          <Input name="entity" label="entity" type="text" value={person.entity} required />
          <Input name="email" label="email" type="text"
                 value={person.email} validations="isEmail" validationError="please enter a valid email address" required />
          <Input name="phone" label="phone" type="text" value={person.phone} required />
        </Card>
      </Form>
    );
  }
}

export default PersonForm;