import { getAllPersonIds } from './store';

export * from './people/actions';
export const SEARCH_CHANGED = 'SEARCH_CHANGED';
export const DISCOVER_NEXT = 'DISCOVER_NEXT';
export const DISCOVER_PREV = 'DISCOVER_PREV';


export function searchChanged(search) {
  return {
    type: SEARCH_CHANGED,
    search
  };
}

export function discoverNextOf(of) {
  return {
    type: DISCOVER_NEXT,
    of
  };
}

export function discoverNext() {
  return (dispatch, getState) => {
    dispatch(discoverNextOf(getAllPersonIds(getState()).length));
  };
}

export function discoverPrevOf(of) {
  return {
    type: DISCOVER_PREV,
    of
  };
}

export function discoverPrev() {
  return (dispatch, getState) => {
    dispatch(discoverPrevOf(getAllPersonIds(getState()).length));
  };
}