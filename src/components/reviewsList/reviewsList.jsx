import React from "react";
import PropTypes from "prop-types";
import ReviewsItem from "../reviewsItem/reviewsItem.jsx";
import {connect} from "react-redux";
import ReviewsForm from "../reviewsForm/reviewsForm.jsx";

const ReviewsList = (props) => {
  const {offerId, reviews, authStatus} = props;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((item) =>
          <ReviewsItem
            key = {item.id}
            review = {item}
          />
        )}
      </ul>
      {authStatus && <ReviewsForm offerId={offerId} onSubmit={() => {}}/>}
    </section>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.array.isRequired,
  authStatus: PropTypes.bool.isRequired,
  offerId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  reviews: state.comments,
  authStatus: state.authStatus,
});

export {ReviewsList};
export default connect(mapStateToProps)(ReviewsList);
