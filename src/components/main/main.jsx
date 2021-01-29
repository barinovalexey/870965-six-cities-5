import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Locations from "../locations/locations.jsx";
import Places from "../places/places.jsx";
import PlacesEmpty from "../places-empty/places-empty.jsx";

const Main = (props) => {
  const {currentCity, cities, offersCount, children} = props;
  return (
    <div className="page page--gray page--main">
      {children}
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations currentCity={currentCity} cities={cities}/>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            {offersCount ? <Places /> : <PlacesEmpty/>}
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  currentCity: PropTypes.string.isRequired,
  cities: PropTypes.object.isRequired,
  offersCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currentCity: state.currentCity,
  cities: state.cities,
  offersCount: state.offersCount,
});

export {Main};
export default connect(mapStateToProps)(Main);
