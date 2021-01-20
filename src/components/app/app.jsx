import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: `main`,
      currentOffer: null
    };
  }

  render() {
    const {offers} = this.props;

    if (this.state.page === `property`) {
      return (
        <Property
          offer={this.state.currentOffer}
          offers = {offers}
        />
      );
    }

    return (
      <Main
        offers = {offers}
        onCardTitleClick = {(offer) => {
          this.setState({
            page: `property`,
            currentOffer: offer
          });
        }}
      />
    );
  }
}

App.propTypes = {
  offers: PropTypes.array.isRequired
};
