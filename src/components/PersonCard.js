import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from './Card';
import { getPersonById } from '../state/store';
import { personEditingStarted } from '../state/actions';

const mapStateToProps = (state, {id}) => ({
  person: getPersonById(state, id)
});

const mapDispatchToProps = (dispatch, {id}) => ({
  onEdit: () => dispatch(personEditingStarted(id))
});

const enhance = connect(mapStateToProps, mapDispatchToProps);

export const PersonCard = ({
  id: personId,
  person: {
    id,
    firstname,
    lastname,
    photo,
    entity,
    email,
    phone,
    manager,
    managerId
  } = {},
  enableEdit,
  onEdit
}) => {
  return id !== undefined
    ? <Card actions={ enableEdit && [
        <a onClick={onEdit} key="edit">edit</a>
      ]}>
        <Card.Avatar photoUrl={photo} altText={`photo of ${firstname}`} />
        <Card.Title
          mainTitle={<Link to={`/person/${id}`}>{firstname} {lastname}</Link>}
          subTitle={entity}
        />
        <Card.Info icon="email">
          <a href={`mailto:${email}`}>{email}</a>
        </Card.Info>
        <Card.Info icon="phone">
          <a href={`tel:${phone}`}>{phone}</a>
        </Card.Info>
        { manager && managerId && (
          <Card.Info icon="supervisor_account" desc="manager">
            <Link to={`/person/${managerId}`}>{manager}</Link>
          </Card.Info>
        )}
      </Card>  
    : <Card>
        <Card.Info icon="warning">
          person with id: {personId} does not exist
        </Card.Info>
      </Card>
};

export default enhance(PersonCard);
