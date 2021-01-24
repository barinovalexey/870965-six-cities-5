import {offers} from "./mocks/offers";

const cities = {};

offers.forEach((item) => {
  cities[item.city.name] = item.city;
});

const initialState = {
  currentCity: offers[0].city.name,
  currentOfferId: null,
  offers: offers.filter((item) => {
    return item.city.name === offers[0].city.name;
  }),
  cities,
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
  changeCity: (cityName) => ({
    type: ActionType.CHANGE_CITY,
    payload: cityName,
  }),
  getOffers: () => ({
    type: ActionType.GET_OFFERS,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY: {
      return Object.assign({}, state, {currentCity: action.payload});
    }
    case ActionType.GET_OFFERS: {
      const currentCityOffers = offers.filter((item) => {
        return item.city.name === state.currentCity;
      });
      return Object.assign({}, state, {offers: currentCityOffers});
    }
    case ActionType.SET_OFFER_ID: {
      return Object.assign({}, state, {currentOfferId: action.payload});
    }
  }

  return state;
};

export {reducer, ActionCreator};
