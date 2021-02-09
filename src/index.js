import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {reducer, Operation, ActionCreator} from "./reducer";
import thunk from "redux-thunk";
import {createAPI} from "./api";
import {compose} from "recompose";
import {BrowserRouter} from "react-router-dom";
import withOffersLoader from "./hocs/with-offers-loader/with-offers-loader.jsx";
import ScrollToTop from "./components/scroll-to-top/scroll-to-top.jsx";


const onUnauthorized = () => {
  store.dispatch(ActionCreator.setAuth(false));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )

);

store.dispatch(Operation.checkAuth());

const AppWithOffersLoader = withOffersLoader(App);

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <AppWithOffersLoader/>
      </BrowserRouter>
    </Provider>,
    document.querySelector(`#root`)
);
