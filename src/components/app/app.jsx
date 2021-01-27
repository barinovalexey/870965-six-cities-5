import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import {connect} from "react-redux";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {currentOfferId} = this.props;

    if (currentOfferId) {
      return (
        <Property
          offerId={currentOfferId}
        />
      );
    }

    return (
      <Main/>
    );
  }
}

App.propTypes = {
  currentOfferId: PropTypes.any,
};

const mapStateToProps = (state) => ({
  currentOfferId: state.currentOfferId,
});

export {App};
export default connect(mapStateToProps)(App);
