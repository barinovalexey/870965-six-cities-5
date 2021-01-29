import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import {connect} from "react-redux";
import SignIn from "../sign-in/sign-in.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {currentOfferId, isAuthRequired} = this.props;

    if (currentOfferId) {
      return (
        <Property
          offerId={currentOfferId}
        />
      );
    }

    const header = (
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );

    return isAuthRequired ?
      (
        <Main>
          {header}
        </Main>
      ) :
      (
        <SignIn>
          {header}
        </SignIn>
      );
  }
}

App.propTypes = {
  currentOfferId: PropTypes.any,
  isAuthRequired: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  currentOfferId: state.currentOfferId,
  isAuthRequired: state.isAuthRequired,
});

export {App};
export default connect(mapStateToProps)(App);
