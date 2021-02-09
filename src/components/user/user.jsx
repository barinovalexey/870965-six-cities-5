import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const User = (props) => {
  const {authStatus, user} = props;
  return (
    <li className="header__nav-item user">
      <Link to={authStatus ? `/favorites` : `/login`} className="header__nav-link header__nav-link--profile">
        <div className="header__avatar-wrapper user__avatar-wrapper">
        </div>
        {authStatus ?
          <span className="header__user-name user__name">{user.email}</span> :
          <span className="header__login">Sign in</span>}
      </Link>
    </li>
  );
};

User.propTypes = {
  authStatus: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  authStatus: state.authStatus,
  user: state.user,
});

export {User};
export default connect(mapStateToProps)(User);
