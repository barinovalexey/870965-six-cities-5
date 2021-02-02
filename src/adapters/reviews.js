export const parseReviews = (reviews) => {
  return reviews.map((review) => {
    const adapterOffer = Object.assign({}, review, {
      userAvatar: review.user.avatar_url,
      userName: review.user.name,
      rating: ((review.rating * 100) / 5),
      text: review.comment,
      date: new Date(review.date),
    });

    delete adapterOffer.comment;
    return adapterOffer;
  });
};
