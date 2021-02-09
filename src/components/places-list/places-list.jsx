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
    const {offers, theme, onCardHover, history} = this.props;

    return (
      <div className={theme === `cities` ?
        `cities__places-list places__list tabs__content` :
        `near-places__list places__list`
      }>
        {offers.map((item) => <PlaceCard
          theme = {theme}
          key={item.id}
          offer={item}
          onCardHover={onCardHover}
          history={history}
        />)}
      </div>
    );
  }
}

PlacesList.propTypes = {
  offers: PropTypes.array.isRequired,
  theme: PropTypes.string,
  onCardHover: PropTypes.func.isRequired,
  history: PropTypes.object,
};

export default PlacesList;
