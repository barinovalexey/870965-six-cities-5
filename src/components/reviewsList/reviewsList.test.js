import React from "react";
import renderer from "react-test-renderer";
import ReviewsList from "./reviewsList.jsx";

const reviews = [
  {
    id: `101`,
    userName: `Max`,
    userAvatar: `img/avatar-max.jpg`,
    rating: 80,
    text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    date: new Date(2020, 3, 2)
  },
  {
    id: `102`,
    userName: `Max`,
    userAvatar: `img/avatar-max.jpg`,
    rating: 60,
    text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    date: new Date(2020, 4, 7)
  }
];

it(`Render ReviewsList`, function () {
  const tree = renderer
    .create(<ReviewsList
      reviews={reviews}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
