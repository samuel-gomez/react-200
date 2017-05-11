import React from 'react';
import { connect } from 'react-redux';
import PersonCard from '../components/PersonCard';
import SearchInput from '../components/SearchInput';

// utils

const filterPerson = search => person => {
  if (!search) {
    return true;
  } else {
    const re = new RegExp(search, 'i');
    return re.test(person.firstname) || re.test(person.lastname);
  }
};

// connect

const mapStateToProps = state => ({
  people: state.people,
  search: state.search
});

const mapDispatchToProps = dispatch => ({
  searchChanged: event => void dispatch({ type: 'SEARCH_CHANGED', search: event.target.value })
});

const enhance = connect(mapStateToProps, mapDispatchToProps);

// Component

const ListAll = ({people, search, searchChanged}) => (
  <div className="ListAll">
    <div className="card-container">
      { people
        .filter(filterPerson(search))
        .map(person => 
          <PersonCard {...person} key={person.id} />
        )
      }
    </div>
    <div className="control-container">
      <SearchInput id="search" label="search by name"
        value={search}
        onChange={searchChanged}
      />
    </div>
  </div>
);

export default enhance(ListAll);