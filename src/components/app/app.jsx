import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentOfferId: null
    };
  }

  render() {
    const {offers, currentOfferId, onCardTitleClick} = this.props;

    if (currentOfferId) {
      return (
        <Property
          offer={offers.find((item) => item.id === currentOfferId)}
          offers = {offers}
          onCardTitleClick = {onCardTitleClick}
        />
      );
    }

    return (
      <Main
        offers = {offers}
        onCardTitleClick = {onCardTitleClick}
      />
    );
  }
}

App.propTypes = {
  offers: PropTypes.array.isRequired,
  currentOfferId: PropTypes.any,
  onCardTitleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentOfferId: state.currentOfferId,
});

const mapDispatchToProps = (dispatch) => ({
  onCardTitleClick(offer) {
    dispatch(ActionCreator.setOfferId(offer));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
