import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation} from "../../reducer";

class ReviewsForm extends PureComponent {
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
    const {onSubmit, currentOfferId} = this.props;

    evt.preventDefault();
    this.setState({formDisabled: true});
    const comment = {
      rating: this.state.rating,
      comment: this.state.comment,
    };
    onSubmit(currentOfferId, comment, this._onSuccess, this._onError);
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
      <form className="reviews__form form" disabled = {this.state.formDisabled} action="#" onSubmit={this._handleSubmit} >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        {this.state.message}
        <div className="reviews__rating-form form__rating">
          <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"
            onChange={this._handleRatingChange}
            checked={this.state.rating === `5`}/>
          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"
            onChange={this._handleRatingChange}
            checked={this.state.rating === `4`}/>
          <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"
            onChange={this._handleRatingChange}
            checked={this.state.rating === `3`}/>
          <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"
            onChange={this._handleRatingChange}
            checked={this.state.rating === `2`}/>
          <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"
            onChange={this._handleRatingChange}
            checked={this.state.rating === `1`}/>
          <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review"
          placeholder="Tell how was your stay, what you like and what can be improved" minLength="50" maxLength="300" required={true}
          value={this.state.comment} onChange={this._handleReviewChange}></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
            stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled = {this.state.formDisabled}>Submit</button>
        </div>
      </form>
    );
  }
}


ReviewsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentOfferId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currentOfferId: state.currentOfferId,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(offerId, review, onSuccess, onError) {
    dispatch(Operation.postReview(offerId, review, onSuccess, onError));
  },
});

export {ReviewsForm};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewsForm);
