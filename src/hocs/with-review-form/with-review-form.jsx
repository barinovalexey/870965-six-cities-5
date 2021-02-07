import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withReviewForm = (Component) => {
  class WithReviewForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {rating: 0, comment: ``, formDisabled: false, message: ``};

      this._handleSubmit = this._handleSubmit.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleReviewChange = this._handleReviewChange.bind(this);
      this._onSuccess = this._onSuccess.bind(this);
      this._onError = this._onError.bind(this);
    }

    _handleRatingChange(evt) {
      this.setState({rating: evt.target.value});
    }

    _handleReviewChange(evt) {
      this.setState({comment: evt.target.value});
    }

    _handleSubmit(evt) {
      const {onSubmit, offerId} = this.props;

      evt.preventDefault();
      this.setState({formDisabled: true});
      const comment = {
        rating: this.state.rating,
        comment: this.state.comment,
      };
      onSubmit(offerId, comment, this._onSuccess, this._onError);
    }

    _onSuccess() {
      const message = (<div style={{color: `green`}}>Your comment sent</div>);
      this.setState({rating: 0, comment: ``, formDisabled: false, message});
    }

    _onError(error) {
      const message = (<div style={{color: `red`}}>Something wrong {error}</div>);
      this.setState({formDisabled: false, message});
    }

    render() {
      return (
        <Component
          {...this.props}
          rating = {this.state.rating}
          comment = {this.state.comment}
          formDisabled = {this.state.formDisabled}
          message = {this.state.message}
          handleRatingChange = {this._handleRatingChange}
          handleReviewChange = {this._handleReviewChange}
          handleSubmit = {this._handleSubmit}
          onSuccess = {this._onSuccess}
          onError = {this._onError}
        />
      );
    }
  }

  WithReviewForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    offerId: PropTypes.string.isRequired,
  };

  return WithReviewForm;
};


export default withReviewForm;
