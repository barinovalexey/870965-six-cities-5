import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

it(`Render App`, function () {
  const tree = renderer
    .create(<PlaceCard
      title = {`Nice, cozy, warm big bed apartment`}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
