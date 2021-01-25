import React, {PureComponent} from "react";
import PlaceCard from "../place-card/place-card.jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };
  }

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
        {offers.map((item, i) => <PlaceCard
          key={item.name + i}
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

const mapStateToProps = (state) => ({
  offers: state.offers,
});

const mapDispatchToProps = (dispatch) => ({
  onCardHover(card) {
    dispatch(ActionCreator.setActiveCard(card));
  },
});

export {PlacesList};
export default connect(mapStateToProps, mapDispatchToProps)(PlacesList);
