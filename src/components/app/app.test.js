import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {offers} from "../../mocks/offers";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const cities = {};

offers.forEach((item) => {
  cities[item.city.name] = item.city;
});

const mockStore = configureStore([]);

it(`Render App`, function () {
  const store = mockStore({
    currentCity: offers[0].city.name,
    currentOfferId: null,
    offers: offers.filter((item) => {
      return item.city.name === offers[0].city.name;
    }),
    cities,
  });

  const tree = renderer
    .create(<Provider store={store}>
      <App
        offers = {offers}
        currentOfferId = {null}
      />
    </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
