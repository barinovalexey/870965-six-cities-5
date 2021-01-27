import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Locations from "../locations/locations.jsx";
import Places from "../places/places.jsx";
import PlacesEmpty from "../places-empty/places-empty.jsx";

const Main = (props) => {
  const {currentCity, cities, offersCount} = props;
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
