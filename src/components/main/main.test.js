import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const cities = {};

cities[`Amsterdam`] = {
  name: `Amsterdam`,
  coords: [52.38333, 4.9],
  zoom: 13,
};

cities[`Dusseldorf`] = {
  name: `Dusseldorf`,
  coords: [51.225402, 6.776314],
  zoom: 13,
};

const offers = [
  {
    city: {
      name: `Amsterdam`,
      coords: [52.38333, 4.9],
      zoom: 13,
    },
    name: `Beautiful &amp; luxurious apartment at great location`,
    type: `Apartment`,
    rating: `60`,
    price: `120`,
    priceText: `night`,
    images: [`img/apartment-01.jpg`, `img/room.jpg`, `img/room.jpg`, `img/apartment-03.jpg`, `img/apartment-01.jpg`],
    mark: `Premium`,
    inBookmarks: false,
    bedrooms: `3`,
    adults: `4`,
    inside: [`Wi-Fi`, `Heating`, `Kitchen`, `Fridge`, `Washing machine`, `Coffee machine`, `Dishwasher`, `Baby seat`, `Cabel TV`],
    description: `<p class="property__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p class="property__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>`,
    hostName: `Angelina`,
    hostAvatar: `img/avatar-angelina.jpg`,
    isHostPro: true,
  },
  {
    city: {
      name: `Amsterdam`,
      coords: [52.38333, 4.9],
      zoom: 13,
    },
    name: `Wood and stone place`,
    type: `Private room`,
    rating: `80`,
    price: `80`,
    priceText: `night`,
    images: [`img/room.jpg`, `img/room.jpg`, `img/room.jpg`, `img/apartment-03.jpg`, `img/apartment-01.jpg`],
    mark: `none`,
    inBookmarks: true,
    bedrooms: `3`,
    adults: `4`,
    inside: [`Wi-Fi`, `Heating`, `Kitchen`, `Fridge`, `Washing machine`, `Coffee machine`, `Dishwasher`, `Baby seat`, `Cabel TV`],
    description: `<p class="property__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p class="property__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>`,
    hostName: `Angelina`,
    hostAvatar: `img/avatar-angelina.jpg`,
    isHostPro: true,
  },
];

const mockStore = configureStore([]);

it(`Render Main`, function () {
  const store = mockStore({
    currentCity: `Amsterdam`,
    currentOfferId: null,
    offers,
    cities,
  });

  const tree = renderer
    .create(<Provider store={store}><Main
      offers = {offers}
      currentCity = {`Amsterdam`}
      cities = {cities}
    /></Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
