import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import ReviewsList from "../reviewsList/reviewsList.jsx";
import Leaflet from "../leaflet/leaflet.jsx";
import PlacesList from "../places-list/places-list.jsx";

import {connect} from "react-redux";
import {ActionCreator, Operation} from "../../reducer";
import User from "../user/user.jsx";

class Property extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {match, loadComments} = this.props;
    const offerId = match.params.offerId;
    loadComments(offerId);
  }

  componentDidUpdate() {
    const {match, loadComments} = this.props;
    const offerId = match.params.offerId;
    loadComments(offerId);
  }

  render() {
    const {match, offers, onCardHover, changeFavorite, authStatus, history} = this.props;
    const offerId = match.params.offerId;
    const offer = offers.find((item) => item.id.toString() === offerId.toString());
    return (
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link" href="/">
                  <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <User/>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {offer.images.map((item) => {
                  return (
                    <div key={item} className="property__image-wrapper">
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
                    onClick={() => {
                      return authStatus ?
                        changeFavorite(offer) :
                        history.push(`/login`);
                    }}
                    className={
                      `property__bookmark-button
                    ${offer.inBookmarks ? `property__bookmark-button--active ` : ``}
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
                    <div className={`property__avatar-wrapper ${offer.host.is_pro && `property__avatar-wrapper--pro`} user__avatar-wrapper`}>
                      <img className="property__avatar user__avatar" src={`/${offer.host.avatar_url}`} width="74" height="74"
                        alt="Host avatar"/>
                    </div>
                    <span className="property__user-name">
                      {offer.host.name}
                    </span>
                  </div>
                  <div
                    className="property__description"
                    dangerouslySetInnerHTML={{__html: offer.description}}>
                  </div>
                </div>
                <ReviewsList offerId = {offerId}/>
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
                onCardHover = {onCardHover}
                history = {history}
              />
            </section>
          </div>
        </main>
      </div>
    );
  }
}

Property.propTypes = {
  match: PropTypes.object.isRequired,
  offers: PropTypes.array.isRequired,
  onCardHover: PropTypes.func.isRequired,
  loadComments: PropTypes.func,
  changeFavorite: PropTypes.func.isRequired,
  theme: PropTypes.string,
  authStatus: PropTypes.bool,
  history: PropTypes.object,
};

const mapStateToProps = (state) => ({
  offers: state.offersFromServer,
  authStatus: state.authStatus,
});

const mapDispatchToProps = (dispatch) => ({
  onCardHover(card) {
    dispatch(ActionCreator.setActiveCard(card));
  },
  loadComments(id) {
    dispatch(Operation.getComments(id));
  },
  changeFavorite(offer) {
    dispatch(Operation.changeFavorite(offer));
  },
});

export {Property};
export default connect(mapStateToProps, mapDispatchToProps)(Property);
