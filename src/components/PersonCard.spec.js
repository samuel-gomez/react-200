import React from 'react';
import { shallow } from 'enzyme';
import { PersonCard } from './PersonCard';
import Card from './Card';

describe('PersonCard', () => {
  it('should render 3 Infos if manager present', () => {
    const person = {
      id: 'toto',
      manager: 'tata',
      managerId: '123'
    };
    
    const wrapper = shallow(<PersonCard id="toto" person={person}/>);
    expect(wrapper.find(Card.Info)).toHaveLength(3)
  });

  it('should render 2 Infos if manager not present', () => {
    const person = {
      id: 'toto'
    };
    
    const wrapper = shallow(<PersonCard id="toto" person={person}/>);
    expect(wrapper.find(Card.Info)).toHaveLength(2)
  });
});