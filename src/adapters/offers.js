export const parseOffers = (offers) => {
  return offers.map((offer) => {
    const adapterOffer = Object.assign({}, offer, {
      name: offer.title,
      inBookmarks: offer.is_favorite,
      mark: offer.is_premium ? `none` : `Premium`,
      rating: ((offer.rating * 100) / 5).toString(),
      adults: offer.max_adults,
      inside: offer.goods,
      coords: [offer.location.latitude, offer.location.longitude],
      priceText: `night`,
      city: {
        name: offer.city.name,
        coords: [offer.city.location.latitude, offer.city.location.longitude],
        zoom: offer.city.location.zoom,
      },
    });

    delete adapterOffer.title;
    delete adapterOffer.is_favorite;
    delete adapterOffer.is_premium;
    delete adapterOffer.max_adults;
    delete adapterOffer.goods;

    return adapterOffer;
  });
};

export const parseOfferTo = (offer) => {
  const adapterOffer = Object.assign({}, offer, {
    title: offer.name,
    // eslint-disable-next-line camelcase
    is_favorite: offer.inBookmarks,
    // eslint-disable-next-line camelcase
    is_premium: offer.mark !== `none`,
    rating: ((offer.rating * 5) / 100).toString(),
    // eslint-disable-next-line camelcase
    max_adults: offer.adults,
    goods: offer.inside,
  });

  delete adapterOffer.name;
  delete adapterOffer.inBookmarks;
  delete adapterOffer.mark;
  delete adapterOffer.adults;
  delete adapterOffer.inside;
  delete adapterOffer.priceText;
  delete adapterOffer.coords;
  delete adapterOffer.city.coords;
  delete adapterOffer.city.zoom;

  return adapterOffer;
};
