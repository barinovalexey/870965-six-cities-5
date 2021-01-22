import {offers} from "./mocks/offers";

const initialState = {
  city: `Amsterdam`,
  offers,
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`: {
      return Object.assign({}, state, {city: action.payload});
    }
    case `GET_OFFERS`: {
      return Object.assign({}, state, {offers});
    }
  }

  return state;
};

export {reducer};
