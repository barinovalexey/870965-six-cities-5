import React from "react";
import PropTypes from "prop-types";
import LocationsItem from "../locations-item/locations-item.jsx";

const Locations = (props) => {
  const {currentCity, cities} = props;
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Object.keys(cities).map((city) => (
          <LocationsItem
            key={city}
            cityName = {cities[city].name}
            currentCity = {currentCity}
          />
        ))}
      </ul>
    </section>
  );
};

export default Locations;

Locations.propTypes = {
  currentCity: PropTypes.string.isRequired,
  cities: PropTypes.object.isRequired,
};
