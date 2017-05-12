import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pure } from 'recompose';

import { discoverNext, discoverPrev } from '../state/actions';
import PersonCard from '../components/PersonCard';
import Fab from '../components/Fab';

// state management

const play = () => ({
  playing: true
});

const pause = () => ({
  playing: false
});

// subcomponents

const Cards = ({ person }) => (
  <div className="card-container">
    <PersonCard {...person} />
  </div>  
);

const Fabs = pure(({ playing, next, prev, play, pause }) => (
  <div className="control-container">
    <Fab kind="skip_previous" onClick={prev} />
    { playing
    ? <Fab kind="pause" large onClick={pause} />
    : <Fab kind="play_arrow" large onClick={play} />
    }
    <Fab kind="skip_next" onClick={next} />
  </div>
));

// container

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  play = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.props.showNext, 2000);
    this.props.showNext();
    this.setState(play);
  };

  pause = () => {
    clearInterval(this.intervalId);
    this.setState(pause);
  };
  
  render() {
    const { person, showNext, showPrev } = this.props;
    const { playing } = this.state;
    return (
      <div className="Discover">
        <Cards person={person} />
        <Fabs
          playing={playing}
          next={showNext}
          prev={showPrev}
          play={this.play}
          pause={this.pause}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  person: state.people[state.discover[0]]
});

const mapDispatchToProps = dispatch => ({
  showNext: () => dispatch(discoverNext()),
  showPrev: () => dispatch(discoverPrev())
});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);