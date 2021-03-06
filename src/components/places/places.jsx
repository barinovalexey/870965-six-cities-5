import React, {Fragment} from "react";
import PropTypes from "prop-types";
import PlacesList from "../places-list/places-list.jsx";
import {connect} from "react-redux";
import PlacesSorting from "../places-sorting/places-sorting.jsx";
import withToggle from "../../hocs/with-toggle/with-toggle.jsx";
import Leaflet from "../leaflet/leaflet.jsx";

const PlacesSortingWithToggle = withToggle(PlacesSorting);

const Places = (props) => {
  const {offers, currentCity, cities} = props;
  return (
    <Fragment>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {currentCity}</b>
        <PlacesSortingWithToggle/>
        <PlacesList
          theme = {`cities`}
        />
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Leaflet
            city = {cities[currentCity].coords}
            zoom = {cities[currentCity].zoom}
          />
        </section>
      </div>
    </Fragment>
  );
};

Places.propTypes = {
  offers: PropTypes.array.isRequired,
  currentCity: PropTypes.string.isRequired,
  cities: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  currentCity: state.currentCity,
  cities: state.cities,
});

export {Places};
export default connect(mapStateToProps)(Places);
