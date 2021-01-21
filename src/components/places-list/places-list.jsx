import React, {PureComponent} from "react";
import PlaceCard from "../place-card/place-card.jsx";
import PropTypes from "prop-types";

export default class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };
  }

  render() {
    const {offers, onCardTitleClick, theme} = this.props;

    return (
      <div className={theme === `cities` ?
        `cities__places-list places__list tabs__content` :
        `near-places__list places__list`
      }>
        {offers.map((item, i) => <PlaceCard
          key={item.name + i}
          offer={item}
          onCardHover={(offer) => {
            this.setState({activeCard: offer});
          }}
          onCardTitleClick = {onCardTitleClick}
          theme = {theme}
        />)}
      </div>
    );
  }
}

PlacesList.propTypes = {
  offers: PropTypes.array.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  theme: PropTypes.string,
};
