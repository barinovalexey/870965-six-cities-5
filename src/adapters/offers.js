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
