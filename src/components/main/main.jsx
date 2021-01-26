import React from "react";
import PropTypes from "prop-types";
import PlacesList from "../places-list/places-list.jsx";
import Leaflet from "../leaflet/leaflet.jsx";
import {connect} from "react-redux";
import Locations from "../locations/locations.jsx";
import PlacesSorting from "../places-sorting/places-sorting.jsx";

const Main = (props) => {
  const {offers, currentCity, cities} = props;
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
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {currentCity}</b>
              <PlacesSorting/>
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
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  offers: PropTypes.array.isRequired,
  currentCity: PropTypes.string.isRequired,
  cities: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  currentCity: state.currentCity,
  cities: state.cities,
});

export {Main};
export default connect(mapStateToProps)(Main);
