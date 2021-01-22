import {offers} from "./mocks/offers";

const initialState = {
  city: `Amsterdam`,
  currentOfferId: null,
  offers,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
  SET_OFFER_ID: `SAVE_OFFER_ID`,
};

const ActionCreator = {
  setOfferId: (offer) => ({
    type: ActionType.SET_OFFER_ID,
    payload: offer.id,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY: {
      return Object.assign({}, state, {city: action.payload});
    }
    case ActionType.GET_OFFERS: {
      return Object.assign({}, state, {offers});
    }
    case ActionType.SET_OFFER_ID: {
      return Object.assign({}, state, {currentOfferId: action.payload});
    }
  }

  return state;
};

export {reducer, ActionCreator};
