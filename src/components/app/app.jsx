import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import {connect} from "react-redux";
import SignIn from "../sign-in/sign-in.jsx";
import {Operation} from "../../reducer";
import User from "../user/user.jsx";
import {Route, Switch} from "react-router-dom";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {login} = this.props;

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
                <User/>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );

    return (
      <Switch>
        <Route path="/" exact>
          <Main>
            {header}
          </Main>
        </Route>
        <Route path="/login" exact>
          <SignIn onSubmit={login}>
            {header}
          </SignIn>
        </Route>
        <Route path="/property/:offerId" exact component={Property}>
        </Route>
      </Switch>
    );
  }
}

App.propTypes = {
  currentOfferId: PropTypes.any,
  authStatus: PropTypes.bool,
  login: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currentOfferId: state.currentOfferId,
  authStatus: state.authStatus,
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(Operation.login(authData));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
