const initialState = {
  people: null
};

export const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case "PEOPLE_RECEIVED":
      return {...state, people: action.people};
    default:
      return state;
  }
}
