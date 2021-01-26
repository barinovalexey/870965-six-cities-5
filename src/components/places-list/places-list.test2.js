import React from "react";
import renderer from "react-test-renderer";
import PlacesList from "../place-card/place-card";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const offers = [
  {
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

describe(`PlaceCard component render correctly`, () => {

  const store = mockStore({
    offers,
    onCardTitleClick: ()=>{},
  });

  it(`Render PlacesList in Main`, function () {
    const tree = renderer
    .create(<Provider store={store}><PlacesList
      theme = {`cities`}
    /></Provider>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render PlacesList in Property`, function () {
    const tree = renderer
      .create(<Provider store={store}><PlacesList
        theme = {`near-places`}
      /></Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
