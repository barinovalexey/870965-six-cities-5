import React from "react";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer";
import {connect} from "react-redux";

const LocationsItem = (props) => {
  const {currentCity, cityName, onCityClick} = props;
  return (
    <li className="locations__item">
      <a onClick={(evt) => {
        evt.preventDefault();
        onCityClick(cityName);
      }} className={`locations__item-link tabs__item ${cityName === currentCity && `tabs__item--active`}`}>
        <span>{cityName}</span>
      </a>
    </li>
  );
};

LocationsItem.propTypes = {
  currentCity: PropTypes.string.isRequired,
  cityName: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick(cityName) {
    dispatch(ActionCreator.changeCity(cityName));
    dispatch(ActionCreator.getOffers());
  },
});

export {LocationsItem};
export default connect(null, mapDispatchToProps)(LocationsItem);
