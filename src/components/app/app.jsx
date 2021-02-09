import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import {connect} from "react-redux";
import SignIn from "../sign-in/sign-in.jsx";
import {Operation} from "../../reducer";
import User from "../user/user.jsx";
import {Route, Switch} from "react-router-dom";
import Favorites from "../favorites/favorites.jsx";

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
              <a href="/" className="header__logo-link header__logo-link--active">
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

    const footer = (
      <footer className="footer container">
        <a className="footer__logo-link" href="/">
          <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    );

    return (
      <Switch>
        <Route path="/" exact render={(props)=> <Main {...props}>{header}</Main>}/>
        <Route path="/login" exact render={(props)=> <SignIn {...props} onSubmit={login}>{header}</SignIn>}/>
        <Route path="/favorites" exact render={(props)=> <Favorites {...props} footer={footer}>{header}</Favorites>}/>
        <Route path="/property/:offerId" exact component={Property} />
      </Switch>
    );
  }
}

App.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(Operation.login(authData));
  },
});

export {App};
export default connect(null, mapDispatchToProps)(App);
