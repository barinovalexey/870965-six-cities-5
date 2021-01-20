import React from "react";
import renderer from "react-test-renderer";
import ReviewsItem from "./reviewsItem.jsx";

const review = {
  id: `101`,
  userName: `Max`,
  userAvatar: `img/avatar-max.jpg`,
  rating: 80,
  text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
  date: new Date(2020, 3, 2)
};

it(`Render ReviewsItem`, function () {
  const tree = renderer
    .create(<ReviewsItem
      review = {review}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
