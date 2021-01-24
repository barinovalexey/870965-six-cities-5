import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import L from 'leaflet';
import {connect} from "react-redux";

class Leaflet extends PureComponent {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.markers = [];
  }

  componentDidMount() {
    const {offers, city, zoom} = this.props;
    if (this.mapRef && this.mapRef.current) {
      this.map = L.map(this.mapRef.current, {
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
        const marker = new L.Marker(offerCords, {icon});
        this.markers.push(marker);
        this.map.addLayer(marker);
      });


    }
  }

  componentDidUpdate() {
    const {offers, city, zoom} = this.props;

    if (this.map) {
      this.map.setView(city, zoom);
      this.markers.forEach((marker) => {
        this.map.removeLayer(marker);
      });
      this.markers = [];

      const icon = L.icon({
        iconUrl: `img/pin.svg`,
        iconSize: [30, 30]
      });

      offers.forEach((item) => {
        const offerCords = item.coords;
        const marker = new L.Marker(offerCords, {icon});
        this.markers.push(marker);
        this.map.addLayer(marker);
      });
    }
  }

  render() {
    return (
      <div ref={this.mapRef} style={{height: `100%`}}></div>
    );
  }
}

Leaflet.propTypes = {
  offers: PropTypes.array.isRequired,
  city: PropTypes.array.isRequired,
  zoom: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  offers: state.offers,
});

export {Leaflet};
export default connect(mapStateToProps)(Leaflet);

