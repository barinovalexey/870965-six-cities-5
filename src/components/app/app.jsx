import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import {connect} from "react-redux";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentOfferId: null
    };
  }

  render() {
    const {offers, currentOfferId} = this.props;

    if (currentOfferId) {
      return (
        <Property
          offer={offers.find((item) => item.id === currentOfferId)}
          offers = {offers}
        />
      );
    }

    return (
      <Main/>
    );
  }
}

App.propTypes = {
  offers: PropTypes.array.isRequired,
  currentOfferId: PropTypes.any,
};

const mapStateToProps = (state) => ({
  currentOfferId: state.currentOfferId,
  offers: state.offers,
});

export {App};
export default connect(mapStateToProps)(App);
