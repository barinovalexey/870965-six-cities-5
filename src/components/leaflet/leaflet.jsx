import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import L from 'leaflet';

export default class Leaflet extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {offers, city, zoom} = this.props;
    this.map = L.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });

    const icon = L.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });


    L.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
      .addTo(this.map);

    offers.forEach((item) => {
      const offerCords = item.coords;
      L
        .marker(offerCords, {icon})
        .addTo(this.map);
    });
  }

  render() {
    return (
      <div id="map" style={{height: `100%`}}></div>
    );
  }
}

Leaflet.propTypes = {
  offers: PropTypes.array({
    coords: PropTypes.array.isRequired,
  }),
  city: PropTypes.array.isRequired,
  zoom: PropTypes.isRequired
};

