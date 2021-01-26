import {offers} from "./mocks/offers";
import {SortType} from "./const";

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
  activeSortingOption: `Popular`,
  activeMapCard: null,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
  SET_OFFER_ID: `SAVE_OFFER_ID`,
  SET_SORT: `SET_SORT`,
  SET_ACTIVE_CARD: `SET_ACTIVE_CARD`,
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
  }),
  setSort: (sortType) => ({
    type: ActionType.SET_SORT,
    payload: sortType,
  }),
  setActiveCard: (card) => ({
    type: ActionType.SET_ACTIVE_CARD,
    payload: card,
  }),
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

      switch (state.activeSortingOption) {
        case SortType.TO_HIGH: {
          currentCityOffers.sort((a, b) => {
            return parseFloat(a.price) - parseFloat(b.price);
          });
          break;
        }
        case SortType.TO_LOW: {
          currentCityOffers.sort((a, b) => {
            return parseFloat(b.price) - parseFloat(a.price);
          });
          break;
        }
        case SortType.TOP_RATED: {
          currentCityOffers.sort((a, b) => {
            return parseFloat(b.rating) - parseFloat(a.rating);
          });
          break;
        }
      }

      return Object.assign({}, state, {offers: currentCityOffers});
    }
    case ActionType.SET_OFFER_ID: {
      return Object.assign({}, state, {currentOfferId: action.payload});
    }
    case ActionType.SET_SORT: {
      return Object.assign({}, state, {activeSortingOption: action.payload});
    }
    case ActionType.SET_ACTIVE_CARD: {
      return Object.assign({}, state, {activeMapCard: action.payload});
    }
  }

  return state;
};

export {reducer, ActionCreator};
