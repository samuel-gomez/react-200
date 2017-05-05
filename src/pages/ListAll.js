import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
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

// Component

const enhance = compose(
  withState('search', 'setSearch', ''),
  withHandlers({
    searchChanged: props => event => props.setSearch(event.target.value)
  })
);

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