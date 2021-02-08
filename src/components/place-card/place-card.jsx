import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation} from "../../reducer";
import {Link} from "react-router-dom";

const PlaceCard = (props) => {
  const {offer, onCardHover, theme, changeFavorite, authStatus, history} = props;

  return (
    <article
      className={theme === `cities` ?
        `cities__place-card place-card` :
        `${theme}__card place-card`
      }
      onMouseEnter={() => {
        onCardHover(offer);
      }}>
      {offer.mark === `none` ? `` : (
        <div className="place-card__mark">
          <span>{offer.mark}</span>
        </div>
      )}

      <div className={`${theme}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img
            className={`place-card__image`}
            src={offer.images[0]}
            width={theme === `favorites` ? `150` : `260`}
            height={theme === `favorites` ? `110` : `200`}
            alt="Place image"
          />
        </a>
      </div>
      <div className={`${theme === `favorites` ? `favorites__card-info ` : ``}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;{offer.priceText}</span>
          </div>
          <button
            onClick={() => {
              return authStatus ?
                changeFavorite(offer) :
                history.push(`/login`);
            }}
            className={
              `place-card__bookmark-button
                    ${offer.inBookmarks ? `place-card__bookmark-button--active ` : ``}
                    button`
            }
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${offer.rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/property/${offer.id}`}>{offer.name}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    mark: PropTypes.string.isRequired,
    inBookmarks: PropTypes.bool,
    bedrooms: PropTypes.number.isRequired,
    adults: PropTypes.number.isRequired,
    inside: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
  }),
  onCardHover: PropTypes.func,
  changeFavorite: PropTypes.func.isRequired,
  theme: PropTypes.string,
  authStatus: PropTypes.bool,
  history: PropTypes.object,
};

const mapStateToProps = (state) => ({
  authStatus: state.authStatus,
});

const mapDispatchToProps = (dispatch) => ({
  changeFavorite(offer) {
    dispatch(Operation.changeFavorite(offer));
  },
});

export {PlaceCard};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);
