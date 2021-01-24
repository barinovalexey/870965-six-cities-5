import React, {PureComponent} from "react";
import PlaceCard from "../place-card/place-card.jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };
  }

  render() {
    const {offers, theme} = this.props;

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
          theme = {theme}
        />)}
      </div>
    );
  }
}

PlacesList.propTypes = {
  offers: PropTypes.array.isRequired,
  theme: PropTypes.string,
};

const mapStateToProps = (state) => ({
  offers: state.offers,
});

export {PlacesList};
export default connect(mapStateToProps)(PlacesList);
