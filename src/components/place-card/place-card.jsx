import React from "react";
import PropTypes from "prop-types";


const PlaceCard = (props) => {
  const {offer, onCardHover, onCardTitleClick, theme} = props;

  return (
    <article
      className={theme === `cities` ?
        `cities__place-card place-card` :
        `near-places__card place-card`
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
          <img className="place-card__image" src={offer.images[0]} width="260" height="200"
            alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;{offer.priceText}</span>
          </div>
          <button
            className={
              `place-card__bookmark-button
                    ${offer.inBookmarks && `place-card__bookmark-button--active `}
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
          <a href="#" onClick={(evt) => {
            evt.preventDefault();
            onCardTitleClick(offer);
          }}>{offer.name}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
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
  }),
  onCardHover: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  theme: PropTypes.string,
};

export default PlaceCard;
