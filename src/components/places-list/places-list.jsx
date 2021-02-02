import React, {PureComponent} from "react";
import PlaceCard from "../place-card/place-card.jsx";
import PropTypes from "prop-types";

class PlacesList extends PureComponent {
  componentDidUpdate() {
    const {onCardHover} = this.props;
    onCardHover(null);
  }

  componentWillUnmount() {
    const {onCardHover} = this.props;
    onCardHover(null);
  }

  render() {
    const {offers, theme, onCardHover} = this.props;

    return (
      <div className={theme === `cities` ?
        `cities__places-list places__list tabs__content` :
        `near-places__list places__list`
      }>
        {offers.map((item) => <PlaceCard
          key={item.id}
          offer={item}
          onCardHover={onCardHover}
        />)}
      </div>
    );
  }
}

PlacesList.propTypes = {
  offers: PropTypes.array.isRequired,
  theme: PropTypes.string,
  onCardHover: PropTypes.func.isRequired,
};

export default PlacesList;
