import React, { Component } from 'react';
import { Form }  from 'formsy-react';
import { Prompt } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from './Card';
import Input from './Input';
import { getPersonById, getEditingStatus } from '../state/store';
import { updatePerson, personEditingCanceled } from '../state/actions';

const mapStateToProps = (state, {id}) => ({
  person: getPersonById(state, id),
  status: getEditingStatus(state, id),
});

const mapDispatchToProps = (dispatch, {id}) => ({
  updatePerson: (patch) => dispatch(updatePerson(id, patch)),
  cancelEdit: () => dispatch(personEditingCanceled(id))
});

const enhance = connect(mapStateToProps, mapDispatchToProps);

class PersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: undefined,
      dirty: false,
      personName: `${props.person.firstname} ${props.person.lastname}`
    };
  }

  onSubmit = (model, reset) => {
    this.props.updatePerson(model)
      .then(success => {
        if (!success) {
          reset();
        }
      })
  }

  onFormValid = () => this.setState({ canSubmit: true });
  onFormInvalid = () => this.setState({ canSubmit: false });
  onChange  = (model, isDirty) => this.setState({
    personName: `${model.firstname} ${model.lastname}`,
    dirty: isDirty
  });
  
  render() {
    const { person, cancelEdit, status } = this.props;
    const { canSubmit, dirty, personName } = this.state;
    const saving = status === 'SAVING';
    
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
          <a onClick={cancelEdit} key="cancel">cancel</a>
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

export default enhance(PersonForm);