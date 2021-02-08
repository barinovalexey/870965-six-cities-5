import React from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";

const FavoritesCity = (props) => {
  const {city, offers} = props;
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((item) => <PlaceCard
          key={item.id}
          offer={item}
          onCardHover={() => {}}
          theme = {`favorites`}
        />)}
      </div>
    </li>
  );
};

FavoritesCity.propTypes = {
  offers: PropTypes.array.isRequired,
  city: PropTypes.string.isRequired,
};

export default FavoritesCity;
