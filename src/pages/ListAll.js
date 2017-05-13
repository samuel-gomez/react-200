import React from 'react';
import { connect } from 'react-redux';

import PersonCard from '../components/PersonCard';
import SearchInput from '../components/SearchInput';
import { searchChanged } from '../state/actions';
import { getFilteredPersonIds, getSearch } from '../state/store';

// connect

const mapStateToProps = state => ({
  filteredPersonIds: getFilteredPersonIds(state),
  search: getSearch(state)
});

const mapDispatchToProps = dispatch => ({
  searchChanged: event => void dispatch(searchChanged(event.target.value))
});

const enhance = connect(mapStateToProps, mapDispatchToProps);

// Component

const ListAll = ({filteredPersonIds, search, searchChanged}) => (
  <div className="ListAll">
    <div className="card-container">
      { filteredPersonIds
        .map(id => 
          <PersonCard id={id} key={id} />
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