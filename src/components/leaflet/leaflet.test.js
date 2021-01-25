import React from "react";
import renderer from "react-test-renderer";
import {Leaflet} from "./leaflet.jsx";

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
    coords: [52.3909553943508, 4.85309666406198],
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
    coords: [52.369553943508, 4.85309666406198],
  },
];

it(`Render Leaflet`, function () {
  const tree = renderer
    .create(<Leaflet
      offers={offers}
      city = {[52.38333, 4.9]}
      zoom = {12}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
