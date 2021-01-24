import React from "react";
import PropTypes from "prop-types";
import ReviewsList from "../reviewsList/reviewsList.jsx";
import reviews from "../../mocks/reviews";
import Leaflet from "../leaflet/leaflet.jsx";
import PlacesList from "../places-list/places-list.jsx";

const Property = (props) => {
  const {offer, offers} = props;
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="/">
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

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.map((item, i) => {
                return (
                  <div key={item + i} className="property__image-wrapper">
                    <img className="property__image" src={item} alt="Photo studio"/>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.mark !== `none` && (
                <div className="property__mark">
                  <span>{offer.mark}</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.name}
                </h1>
                <button
                  className={
                    `property__bookmark-button
                    ${offer.inBookmarks && `property__bookmark-button--active `}
                    button`
                  }
                  type="button"
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${offer.rating}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">4.8</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.adults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;{offer.priceText}</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.inside.map((item) => {
                    return (
                      <li key={item} className="property__inside-item">
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${offer.isHostPro && `property__avatar-wrapper--pro`} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={offer.hostAvatar} width="74" height="74"
                      alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {offer.name}
                  </span>
                </div>
                <div
                  className="property__description"
                  dangerouslySetInnerHTML={{__html: offer.description}}>
                </div>
              </div>
              <ReviewsList
                reviews={reviews}
              />
            </div>
          </div>
          <section className="property__map map">
            <Leaflet
              offers={offers.slice(0, 3)}
              city = {offer.coords}
              zoom = {12}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesList
              offers={offers.slice(0, 3)}
              theme = {`near-places`}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

Property.propTypes = {
  offer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    priceText: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    mark: PropTypes.string.isRequired,
    inBookmarks: PropTypes.bool,
    bedrooms: PropTypes.string.isRequired,
    adults: PropTypes.string.isRequired,
    inside: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    hostName: PropTypes.string.isRequired,
    hostAvatar: PropTypes.string.isRequired,
    isHostPro: PropTypes.bool,
    coords: PropTypes.array.isRequired,
  }),
  offers: PropTypes.array.isRequired,
};

export default Property;
