import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation} from "../../reducer";

const withOffersLoader = (Component) => {
  class WithOffersLoader extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {isOfferLoad: false};
    }

    _loadOffers() {
      this.props.getOffers(() => {
        this.setState({isOfferLoad: true});
      });
    }

    render() {
      if (this.state.isOfferLoad) {
        return (
          <Component
            {...this.props}
          />
        );
      } else {
        this._loadOffers();
        return null;
      }

    }
  }

  WithOffersLoader.propTypes = {
    getOffers: PropTypes.func.isRequired,
  };

  const mapDispatchToProps = (dispatch) => ({
    getOffers(onSuccess) {
      dispatch(Operation.getOffers(onSuccess));
    },
  });

  return connect(null, mapDispatchToProps)(WithOffersLoader);
};

export default withOffersLoader;
