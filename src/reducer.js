import {SortType} from "./const";
import {parseOffers} from "./adapters/offers";

const initialState = {
  offersFromServer: [],
  currentCity: ``,
  currentOfferId: null,
  offers: [],
  cities: {},
  activeSortingOption: `Popular`,
  activeMapCard: null,
  offersCount: 0,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_OFFERS: `SET_OFFERS`,
  SET_OFFER_ID: `SAVE_OFFER_ID`,
  SET_SORT: `SET_SORT`,
  SET_CITIES: `SET_CITIES`,
  SET_ACTIVE_CARD: `SET_ACTIVE_CARD`,
  GET_OFFERS: `GET_OFFERS`,
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
  setOffers: () => ({
    type: ActionType.SET_OFFERS,
  }),
  setCities: () => ({
    type: ActionType.SET_CITIES,
  }),
  setSort: (sortType) => ({
    type: ActionType.SET_SORT,
    payload: sortType,
  }),
  setActiveCard: (card) => ({
    type: ActionType.SET_ACTIVE_CARD,
    payload: card,
  }),
  getOffers: (offerss) => ({
    type: ActionType.GET_OFFERS,
    payload: offerss,
  }),
};

const Operation = {
  getOffers: () => (dispatch, toState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.getOffers(parseOffers(response.data)));
        dispatch(ActionCreator.changeCity());
        dispatch(ActionCreator.setCities());
        dispatch(ActionCreator.setOffers());
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY: {
      return Object.assign({}, state, {currentCity: action.payload || state.offersFromServer[0].city.name});
    }
    case ActionType.SET_OFFERS: {
      const currentCityOffers = state.offersFromServer.filter((item) => {
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

      return Object.assign({}, state, {offers: currentCityOffers, offersCount: currentCityOffers.length});
    }
    case ActionType.SET_CITIES: {
      const cities = {};

      state.offersFromServer.forEach((item) => {
        cities[item.city.name] = item.city;
      });

      return Object.assign({}, state, {cities});
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
    case ActionType.GET_OFFERS: {
      return Object.assign({}, state, {offersFromServer: action.payload});
    }
  }

  return state;
};

export {reducer, ActionCreator, Operation};
