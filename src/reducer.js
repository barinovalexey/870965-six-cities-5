import {SortType} from "./const";
import {parseOffers, parseOfferTo} from "./adapters/offers";
import {parseReviews} from "./adapters/reviews";

const initialState = {
  offersFromServer: [],
  currentCity: ``,
  offers: [],
  cities: {},
  activeSortingOption: `Popular`,
  activeMapCard: null,
  offersCount: 0,
  authStatus: false,
  user: {},
  comments: [],
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_OFFERS: `SET_OFFERS`,
  SET_SORT: `SET_SORT`,
  SET_CITIES: `SET_CITIES`,
  SET_ACTIVE_CARD: `SET_ACTIVE_CARD`,
  GET_OFFERS: `GET_OFFERS`,
  SET_AUTH: `SET_AUTH`,
  SET_USER_DATA: `SET_USER_DATA`,
  GET_COMMENTS: `GET_COMMENTS`,
  CHANGE_FAVORITE: `CHANGE_FAVORITE`,
};

const ActionCreator = {
  changeCity: (cityName) => ({
    type: ActionType.CHANGE_CITY,
    payload: cityName,
  }),
  setOffers: () => ({
    type: ActionType.SET_OFFERS,
  }),
  getComments: (comments) => ({
    type: ActionType.GET_COMMENTS,
    payload: comments,
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
  getOffers: (offers) => ({
    type: ActionType.GET_OFFERS,
    payload: offers,
  }),
  setAuth: (authStatus) => ({
    type: ActionType.SET_AUTH,
    payload: authStatus,
  }),
  setUserData: (userData) => ({
    type: ActionType.SET_USER_DATA,
    payload: userData,
  }),
  changeFavorite: (offerId) => ({
    type: ActionType.CHANGE_FAVORITE,
    payload: offerId,
  }),
};

const Operation = {
  getOffers: (setOfferLoad) => (dispatch, toState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.getOffers(parseOffers(response.data)));
        dispatch(ActionCreator.changeCity());
        dispatch(ActionCreator.setCities());
        dispatch(ActionCreator.setOffers());
        setOfferLoad();
      });
  },
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.setAuth(true));
        dispatch(ActionCreator.setUserData(response.data));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.setAuth(true));
        dispatch(ActionCreator.setUserData(response.data));
      });
  },
  getComments: (id) => (dispatch, toState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.getComments(parseReviews(response.data)));
      });
  },
  postReview: (offerId, review, onSuccess, onError) => (dispatch, getState, api) => {
    return api.post(`/comments/${offerId}`, review)
      .then((response) => {
        dispatch(ActionCreator.getComments(parseReviews(response.data)));
        onSuccess();
      })
      .catch(onError);
  },
  changeFavorite: (offer) => (dispatch, getState, api) => {
    const status = offer.inBookmarks ? 0 : 1;

    return api.post(`/favorite/${offer.id}/${status}`, parseOfferTo(offer))
      .then(() => {
        dispatch(ActionCreator.changeFavorite(offer));
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
      const currentCityOffers = state.offersFromServer.slice().filter((item) => {
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
        cities[item.city.name] = Object.assign({}, item.city);
      });

      return Object.assign({}, state, {cities});
    }
    case ActionType.SET_AUTH: {
      return Object.assign({}, state, {authStatus: action.payload});
    }
    case ActionType.SET_USER_DATA: {
      return Object.assign({}, state, {user: action.payload});
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
    case ActionType.GET_COMMENTS: {
      return Object.assign({}, state, {comments: action.payload});
    }
    case ActionType.CHANGE_FAVORITE: {
      const updatedOffers = state.offersFromServer.map((it) => {
        return it.id === action.payload.id ?
          Object.assign({}, it, {inBookmarks: !it.inBookmarks}) :
          it;
      });
      return Object.assign({}, state, {offersFromServer: updatedOffers});
    }
  }

  return state;
};

export {reducer, ActionCreator, Operation};
