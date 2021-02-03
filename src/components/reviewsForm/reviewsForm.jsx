import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation} from "../../reducer";
import withReviewForm from "../../hocs/with-review-form/with-review-form.jsx";

class ReviewsForm extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      rating,
      comment,
      formDisabled,
      message,
      handleRatingChange,
      handleReviewChange,
      handleSubmit,
    } = this.props;
    return (
      <form className="reviews__form form" disabled = {formDisabled} action="#" onSubmit={handleSubmit} >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        {message}
        <div className="reviews__rating-form form__rating">
          <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"
            onChange={handleRatingChange}
            checked={rating === `5`}/>
          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"
            onChange={handleRatingChange}
            checked={rating === `4`}/>
          <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"
            onChange={handleRatingChange}
            checked={rating === `3`}/>
          <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"
            onChange={handleRatingChange}
            checked={rating === `2`}/>
          <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"
            onChange={handleRatingChange}
            checked={rating === `1`}/>
          <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review"
          placeholder="Tell how was your stay, what you like and what can be improved" minLength="50" maxLength="300" required={true}
          value={comment} onChange={handleReviewChange}></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
            stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled = {formDisabled}>Submit</button>
        </div>
      </form>
    );
  }
}


ReviewsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentOfferId: PropTypes.number.isRequired,
  rating: PropTypes.number,
  comment: PropTypes.string,
  formDisabled: PropTypes.bool,
  message: PropTypes.string,
  handleRatingChange: PropTypes.func,
  handleReviewChange: PropTypes.func,
  handleSubmit: PropTypes.func,
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
export default connect(mapStateToProps, mapDispatchToProps)(withReviewForm(ReviewsForm));
