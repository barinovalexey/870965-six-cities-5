import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

const mockOffer = {
  name: `Beautiful &amp; luxurious apartment at great location`,
  type: `Apartment`,
  rating: `60`,
  price: `120`,
  priceText: `night`,
  image: `img/apartment-01.jpg`,
  mark: `Premium`,
  inBookmarks: false,
};

it(`Render App`, function () {
  const tree = renderer
    .create(<PlaceCard
      offer={mockOffer}
      onCardHover={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
