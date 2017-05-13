import React, { Component } from 'react';

import PersonCard from '../components/PersonCard';
import PersonForm from '../components/PersonForm';

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }
  
  beginEdit = (e) => {
    e.preventDefault();
    this.setState({editing: true});
  }
  
  endEdit = () => this.setState({editing: false});
    
  render() {
    const { id } = this.props.match.params;
    const { editing } = this.state;
    return (
      <div className="card-container">
        { editing
        ? <PersonForm id={id} onEnd={this.endEdit} />
        : <PersonCard id={id} onEdit={this.beginEdit} />
        }
      </div>
    );
  }
}

export default Person;