import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

it(`Render App`, function () {
  const placeCards = [`Nice, cozy, warm big bed apartment`, `Canal View Prinsengracht`, `Wood and stone place`, `Beautiful &amp; luxurious apartment at great location`];

  const tree = renderer
    .create(<App
      placeCards = {placeCards}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
