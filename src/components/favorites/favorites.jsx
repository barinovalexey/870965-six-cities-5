import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import FavoritesEmpty from "../favorites-empty/favorites-empty.jsx";
import FavoritesCities from "../favorites-cities/favorites-cities.jsx";

const Favorites = (props) => {
  const {offersFromServer, cities, children, footer} = props;
  const favoritesOffers = offersFromServer.slice().filter((it) => it.inBookmarks);
  return (
    <div className="page page--gray page--main">
      {children}
      {favoritesOffers.length > 0 ?
        <FavoritesCities cities = {cities} offers={favoritesOffers}/> :
        <FavoritesEmpty/>
      }
      {footer}
    </div>
  );
};

Favorites.propTypes = {
  offersFromServer: PropTypes.array.isRequired,
  cities: PropTypes.object.isRequired,
  children: PropTypes.object,
  footer: PropTypes.object,
};

const mapStateToProps = (state) => ({
  offersFromServer: state.offersFromServer,
  cities: state.cities,
});

export {Favorites};
export default connect(mapStateToProps)(Favorites);
