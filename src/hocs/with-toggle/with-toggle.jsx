import React, {PureComponent} from "react";

const withToggle = (Component) => {
  class WithToggle extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        toggle: false,
      };

      this._toggleHandler = this._toggleHandler.bind(this);
    }

    _toggleHandler() {
      this.setState((prevState) => {
        return {toggle: !prevState.toggle};
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          toggle = {this.state.toggle}
          toggleHandler = {this._toggleHandler}
        />
      );
    }
  }

  return WithToggle;
};

export default withToggle;
