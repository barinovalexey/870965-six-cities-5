import React from "react";
import renderer from "react-test-renderer";
import PlacesList from "../places-list/places-list.jsx";

const offers = [
  {
    name: `Beautiful &amp; luxurious apartment at great location`,
    type: `Apartment`,
    rating: `60`,
    price: `120`,
    priceText: `night`,
    image: `img/apartment-01.jpg`,
    mark: `Premium`,
    inBookmarks: false,
  },
  {
    name: `Wood and stone place`,
    type: `Private room`,
    rating: `80`,
    price: `80`,
    priceText: `night`,
    image: `img/room.jpg`,
    mark: `none`,
    inBookmarks: true,
  }
];

it(`Render App`, function () {
  const tree = renderer
    .create(<PlacesList
      offers={offers}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
