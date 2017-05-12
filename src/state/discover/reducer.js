import { DISCOVER_NEXT, DISCOVER_PREV } from '../actions';

const succ = (current, min, max) => (current === max) ? min : current + 1;
const pred = (current, min, max) => (current === min) ? max : current - 1;

const reducer = (state = 0, action) => {
  switch (action.type) {
    case DISCOVER_NEXT:
      return succ(state, 0, action.of - 1);
    case DISCOVER_PREV:
      return pred(state, 0, action.of - 1);
    default:
      return state;
  }
};

export default reducer;