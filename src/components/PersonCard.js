import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from './Card';
import { getPersonById } from '../state/store';

const mapStateToProps = (state, {id}) => ({
  person: getPersonById(state, id)
});

const enhance = connect(mapStateToProps);

const PersonCard = ({
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
  },
  onEdit
}) => {
  return (
    <Card actions={ onEdit && [
      <a href="#" onClick={onEdit} key="edit">edit</a>
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
  );
};

export default enhance(PersonCard);
