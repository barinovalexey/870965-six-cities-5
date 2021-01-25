import React from "react";
import PropTypes from "prop-types";

const PlacesSortingItem = (props) => {
  const {title, activeSortingOption, onSortingItemClick, optionListClose} = props;
  return (
    <li onClick={() => {
      onSortingItemClick(title);
      optionListClose();
    }} className={`places__option${title === activeSortingOption ? ` places__option--active` : ``}`} tabIndex="0">{title}</li>
  );
};

PlacesSortingItem.propTypes = {
  title: PropTypes.string.isRequired,
  activeSortingOption: PropTypes.string.isRequired,
  onSortingItemClick: PropTypes.func.isRequired,
  optionListClose: PropTypes.func.isRequired,
};

export default PlacesSortingItem;
