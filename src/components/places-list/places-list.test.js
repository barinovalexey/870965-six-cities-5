import React from "react";
import renderer from "react-test-renderer";
import PlacesList from "../places-list/places-list.jsx";
import {offers} from "../../mocks/offers";

it(`Render App`, function () {
  const tree = renderer
    .create(<PlacesList
      offers={offers}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
