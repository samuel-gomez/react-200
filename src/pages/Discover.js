import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pure } from 'recompose';

import { discoverNext, discoverPrev } from '../state/actions';
import { getAllPersonIds } from '../state/store';
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

const Cards = ({ personId }) => (
  <div className="card-container">
    <PersonCard id={personId} />
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
    const { personId, showNext, showPrev } = this.props;
    const { playing } = this.state;
    return (
      <div className="Discover">
        <Cards personId={personId} />
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
  personId: getAllPersonIds(state)[state.discover]
});

const mapDispatchToProps = dispatch => ({
  showNext: () => dispatch(discoverNext()),
  showPrev: () => dispatch(discoverPrev())
});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);