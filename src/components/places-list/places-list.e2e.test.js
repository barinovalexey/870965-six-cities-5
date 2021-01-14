import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "../place-card/place-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mock = {
  offer: {
    name: `Beautiful &amp; luxurious apartment at great location`,
    type: `Apartment`,
    rating: `60`,
    price: `120`,
    priceText: `night`,
    image: `img/apartment-01.jpg`,
    mark: `Premium`,
    inBookmarks: false,
  }
};

it(`Hover on place card should pass to the callback data-object from which this place card was created`, function () {
  const {offer} = mock;
  const onCardHover = jest.fn();

  const screen = shallow(
      <PlaceCard
        offer={offer}
        onCardHover={onCardHover}
      />
  );

  const placeCard = screen.find(`article`);
  placeCard.simulate(`mouseEnter`);

  expect(onCardHover).toHaveBeenCalledTimes(1);

  expect(onCardHover.mock.calls[0][0]).toMatchObject(offer);
});
