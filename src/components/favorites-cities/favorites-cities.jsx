import React from "react";
import PropTypes from "prop-types";
import FavoritesCity from "../favorites-city/favorites-city.jsx";

const FavoritesCities = (props) => {
  const {offers, cities} = props;
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {Object.keys(cities).map((city) => {
              const cityOffers = offers.slice().filter((it) => it.city.name === city);
              return cityOffers.length > 0 ?
                (<FavoritesCity
                  key={city}
                  city={city}
                  offers={cityOffers}
                />) :
                null;
            })
            }
          </ul>
        </section>
      </div>
    </main>
  );
};

FavoritesCities.propTypes = {
  offers: PropTypes.array.isRequired,
  cities: PropTypes.object.isRequired,
};

export default FavoritesCities;
