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
    images: [`img/apartment-01.jpg`, `img/room.jpg`, `img/apartment-03.jpg`, `img/apartment-01.jpg`],
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
  }
};

it(`Hover on place card should pass to the callback data-object from which this place card was created`, function () {
  const {offer} = mock;
  const onCardHover = jest.fn();
  const onCardTitleClick = jest.fn();

  const screen = shallow(
      <PlaceCard
        offer={offer}
        onCardHover={onCardHover}
        onCardTitleClick={onCardTitleClick}
      />
  );

  const placeCard = screen.find(`article`);
  placeCard.simulate(`mouseEnter`);

  expect(onCardHover).toHaveBeenCalledTimes(1);

  expect(onCardHover.mock.calls[0][0]).toMatchObject(offer);
});
