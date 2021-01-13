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
    const {offers} = this.props;
    // eslint-disable-next-line no-console
    console.log(this.state);
    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((item, i) => <PlaceCard
          key={item.name + i}
          offer={item}
          onCardHover={() => {
            this.setState({activeCard: item});
          }}
        />)}
      </div>
    );
  }
}

PlacesList.propTypes = {
  offers: PropTypes.array.isRequired
};
