import React from 'react';
import { connect } from 'react-redux';

import { getEditingStatus } from '../state/store';
import PersonCard from '../components/PersonCard';
import PersonForm from '../components/PersonForm';

const mapStateToProps = (state, {match:{params:{id}}}) => ({
  isEditing: getEditingStatus(state, id) !== undefined
});

const enhance = connect(mapStateToProps);

const Person = ({isEditing, match:{params:{id}}}) => (
  <div className="card-container">
    { isEditing
    ? <PersonForm id={id} />
    : <PersonCard id={id} enableEdit />
    }
  </div>
);

export default enhance(Person);