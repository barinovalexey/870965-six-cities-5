import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";
import {SortType} from "../../const";
import PlacesSortingItem from "../places-sorting-item/places-sorting-item.jsx";

const PlacesSorting = (props) => {
  const {activeSortingOption, onSortingItemClick, toggle, toggleHandler} = props;
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={toggleHandler} className="places__sorting-type" tabIndex="0">
        {activeSortingOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom${toggle ? ` places__options--opened` : ``}`}>
        {Object.keys(SortType).map((item) => (
          <PlacesSortingItem
            key={item}
            title = {SortType[item]}
            activeSortingOption = {activeSortingOption}
            onSortingItemClick = {onSortingItemClick}
            optionListClose = {toggleHandler}
          />
        ))}
      </ul>
    </form>
  );
};

PlacesSorting.propTypes = {
  activeSortingOption: PropTypes.string.isRequired,
  onSortingItemClick: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
  toggleHandler: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeSortingOption: state.activeSortingOption,
});

const mapDispatchToProps = (dispatch) => ({
  onSortingItemClick(sort) {
    dispatch(ActionCreator.setSort(sort));
    dispatch(ActionCreator.getOffers());
  },
});

export {PlacesSorting};
export default connect(mapStateToProps, mapDispatchToProps)(PlacesSorting);
