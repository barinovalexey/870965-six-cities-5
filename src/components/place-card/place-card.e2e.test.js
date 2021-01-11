import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should title be click`, function () {
  const titleClickHandler = jest.fn();

  const placeCard = shallow(
      <PlaceCard
        title = {`Nice, cozy, warm big bed apartment`}
        onTitleClick={titleClickHandler}
      />
  );

  const placeTitle = placeCard.find(`.place-card__name a`);

  placeTitle.getElement().props.onClick();

  expect(titleClickHandler.mock.calls.length).toBe(1);
});
