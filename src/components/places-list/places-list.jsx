import React, {PureComponent} from "react";
import PlaceCard from "../place-card/place-card.jsx";
import PropTypes from "prop-types";

export default class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    const {offers} = this.props;
    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((item, i) => <PlaceCard
          key={item.name + i}
          offer={item}
          onCardHover={() => {
            console.log(item);
          }}
        />)}
      </div>
    );
  }
}

PlacesList.propTypes = {
  offers: PropTypes.array.isRequired
};
